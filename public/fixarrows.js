function fixarrows(arrows_arr, container) {
  // console.log(arrows_arr)
  // console.log(container)
  let container_obj = {
    leftside: container.getBoundingClientRect().x,
    rightside: container.getBoundingClientRect().x + container.clientWidth,
  };
  const resizeArrows = (arrows_arr) => {
    arrows_arr.forEach((arrow, index) => {
      // switch statement
      switch (true) {
        // arrow - previous
        case index % 2 !== 0:
          arrow.style.left = container_obj.leftside + "px";
          break;
        // arrow - next
        case index % 2 === 0:
          arrow.style.left =
            container_obj.rightside - (arrow.clientWidth - 3) + "px";
          break;
        default:
          // console.log(undefined);
          break;
      }
    });
  };
  resizeArrows(arrows_arr)

  // window.onresize = (e) => {
  //   resizeArrows(arrows_arr)
  //   arrows_arr.forEach((arrow, index) => {
  //       // switch statement
  //       switch (true) {
  //         // arrow - previous
  //         case index % 2 !== 0:
  //           arrow.style.left = container_obj.leftside + "px";
  //           break;
  //         // arrow - next
  //         case index % 2 === 0:
  //           arrow.style.left =
  //             container_obj.rightside - (arrow.clientWidth - 3) + "px";
  //           break;
  //         default:
  //           // console.log(undefined);
  //           break;
  //       }
  //     });
  // };
}

export default fixarrows;
