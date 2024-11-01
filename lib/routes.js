require("dotenv").config();
const capFn = require("./capfn");
const path = require("path");
let media = !process.env.COS_DR ? "media" : process.env.COS_DR;
const bcrypt = require("bcrypt");
const salt = 12;

// truncate db
// truncate images;alter sequence images_id_seq restart with 1;
// truncate credentials;alter sequence credentials_id_seq restart with 1;
// delete from credentials where id > 1;alter sequence credentials_id_seq restart with 2;
module.exports = function (app, nodemailer, pool) {
  //functions
  const insertFileIntoDB = async (file, pool) => {
    if (!file) console.log("no files to work with");
    if (!pool) console.log("pool is not read for db use");

    if (file && pool) {
      for (let i = 0; i < file.length; i++) {
        await pool.query("insert into images(image_key) values($1)", [file[i]]);
      }
    }
  };
  const noCoppiedFiles = (file, arg) => {
    // iterate through arg array
    for (let i = 0; i < arg.length; i++) {
      // if file has same image name as arg[i] in the database
      if (file.includes(arg[i].image_key)) {
        // splice the image name from [file] with indexOf() & take that "1" out of the array
        file.splice(file.indexOf(arg[i].image_key), 1);
      }
      // return modified file
    }
    return file;
  };

  // routes
  app.route("/hello").get((req, res) => {
    res.json({ message: "Hello There!" });
  });

  // getEmail fn
  app.route("/get-email").get(async (req, res) => {
    const plain = process.env.USIN;

    const len = await pool.query("select count(id) as length from credentials");
    let lenInteger = len.rows[0].length;
    let ress;

    try {
      // Since db is fixed with 1 row (id, plain & hash), we do not need to focus on the else.
      if (lenInteger > 0 && lenInteger <= 8) {
        let c = 0;
        bcrypt.hash(plain, salt).then(async (hash) => {
          await pool.query(
            "insert into credentials(id,plain,hash) values($3,$1,$2);",
            [plain, hash,c++]
          );
        });
        const latestHash = await pool.query(
          "select hash from credentials where id=$1",
          [lenInteger]
        );
        ress = latestHash.rows[0].hash;
        res.json({ sec: ress });
      } else {
        await pool.query(
          "delete from credentials where id > 1;alter sequence credentials_id_seq restart with 2;"
        );
        const len2 = await pool.query(
          "select count(id) as length from credentials"
        );
        let lenInteger2 = len2.rows[0].length;
        const latestHash2 = await pool.query(
          "select hash from credentials where id=$1",
          [lenInteger2]
        );
        ress = latestHash2.rows[0].hash;
        res.json({ sec: ress });
      }
    } catch (err) {
      console.log(err);
    }
  });
  app.route("/resolve-email").get(async (req, res) => {
    const plain = process.env.USIN;
    const len = await pool.query("select count(id) as length from credentials");
    let lenInteger = len.rows[0].length;

    // insert a hash into the db
    const hash = await pool.query("select * from credentials where id=$1", [
      lenInteger,
    ]);
    const hash_ac = hash.rows[0].hash;
    const hash_pl = hash.rows[0].plain;
    // check if password is true
    bcrypt.compare(plain, hash_ac).then(function (ress) {
      return !ress
        ? res.json({ auth: "forbidden", sec: hash_ac })
        : res.json({ auth: "granted", sec: hash_pl });
    });
  });
  app.route(process.env.SEC4U6).get(async (req, res) => {
    const allH = await pool.query("select * from credentials;");
    console.log(allH.rows);
    res.json({ arg: [...allH.rows] });
  });
  app.route("/send-email").post(async (req, res) => {
    let { first, last, from, to, subject, message, cc, bcc, file } = req.body;
    const plain = process.env.USIN;
    to = await bcrypt.compare(plain, to).then(function (ress) {
      return !ress ? to : plain;
    });
    // compare files to the database
    const getFiles = await pool.query("select * from images order by id desc");
    const files_argument = getFiles.rows;
    let myf = noCoppiedFiles(file, files_argument);
    let transporter = nodemailer.createTransport({
      service: process.env.E_SERVICE,
      auth: {
        user: process.env.USIN,
        pass: process.env.PSWD,
      },
    });
    let mapped_attachments = [...myf].map((f) => {
      return {
        filename: f,
        path: `${media}/${f}`,
      };
    });
    // mail options (who send what to whom)
    let mailOptions = {
      from, //from field
      to, //to field
      cc, // carbon-copy
      bcc, //blind carbon copy
      subject, //subject
      text: message, //text:message(textarea) field
      attachments: !myf
        ? undefined
        : /string/i.test(typeof myf)
        ? { filename: myf, path: `${media}/${myf}` }
        : mapped_attachments, //file field
    };
    mailOptions.text +=
      "\n\nName: " + capFn(first) + " " + capFn(last) + "\nEmail: " + from;
    // start sending mailOptions info
    transporter.sendMail(mailOptions, async function (err, info) {
      try {
        console.log("Message Sent!");
        console.log(req.body);
        await pool.query('truncate credentials,images cascade;alter sequence credentials_id_seq restart with 1;')
        res.json({ message: "sent!" });
      } catch {
        console.log(err);
        res.json({ message: "failed to send" });
      }
      insertFileIntoDB(myf, pool);
    });
  });
  // clear credentials table
  app.route("/creds-del").get(async (req, res) => {
    await pool.query(
      "truncate credentials;alter sequence credentials_id_seq restart with 1;"
    );
    res.json({ message: "creds deletedted successfully" });
  });
  app.route("/imgs-del").get(async (req, res) => {
    await pool.query(
      "truncate images;alter sequence images_id_seq restart with 1;"
    );
    res.json({ message: "images deletedted successfully" });
  });
  // fetch file attachments (if any)
  app.route("/select-db").get(async (req, res) => {
    const getFiles = await pool.query("select * from images order by id desc");
    const files_argument = getFiles.rows;
    res.json({ data: files_argument });
  });
  // show the user that they are not active anymore
  app.route("/user-not-active").get((req, res) => {
    res.json({ message: "user not active" });
  });
  app.route("/my-time").get((req, res) => {
    res.json({ time: !process.env.TIMER ? 300 : process.env.TIMER });
  });
};
