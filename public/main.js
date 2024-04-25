import fixarrows from './fixarrows.js'
import getEmail from './emailhelper.js'
import screentimer from './screentimer.js'
import fetchFiles from './fetchfiles.js'

const fName = document.querySelector('#first')
const lName = document.querySelector('#last')
const name_con = document.getElementById('name-container')
const textarea = document.getElementById('message')
const arrows = document.querySelectorAll('.arrow')
const form = document.getElementById('form')
const send = document.getElementById('send-submit')
const filer = document.getElementById('filer')
const secret = '/get-email'
let to_field = document.getElementById('to')
const delayArrowsOnload = (arrow) => {
    setTimeout(()=>arrow.classList.remove('arrow-opacity'),1000)
}
// window.addEventListener('keydown',e=>{
//     if(e.key==='Tab')e.preventDefault();
// })
textarea.parentElement.onclick = e => {
    let txtArea = e.currentTarget.children[0]
    if(txtArea.classList.contains('textarea-blur')){
        txtArea.classList.remove('textarea-blur');
    }
}

textarea.onblur = e =>{
    // console.log(e.target)
    // console.log('BLUR')
    e.target.classList.add('textarea-blur')
}
textarea.onfocus = e =>{
    // console.log(e.target)
    // console.log('FOCUS')
    e.target.classList.remove('textarea-blur');
}
getEmail(secret,to_field)
screentimer(window)
fixarrows(arrows,name_con)
fetchFiles(form,filer,send,to_field)

arrows.forEach((arrow,index)=>{
    delayArrowsOnload(arrow)
    if(index==0){ // next arrow
        arrow.addEventListener('click',e=>{
            lName.focus();
            e.target.classList.add('hide-arrow')
            arrows[1].classList.remove('hide-arrow')
            // console.log('you went to last')
        })
    }
    else{
        arrow.addEventListener('click',e=>{
            fName.focus();
            e.target.classList.add('hide-arrow')
            arrows[0].classList.remove('hide-arrow')
            // console.log('you went to first')
        })
    }
})

