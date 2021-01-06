document.addEventListener('DOMContentLoaded', () => {
const stickypete = document.querySelector('.character')
let bottom = 50
let gravity = 0.9
let isJumping = false
let isGoingLeft = false
let left = 0
let isGoingRight = false

let leftTimerId = null
let rightTimerId = null

function jump(e) {
  console.log(e.target)
    if (isJumping) return
    let timerUpId = setInterval( function () {
      if (bottom > 250) {
        clearInterval(timerUpId) 
        let timerDownId = setInterval( function() {
          if (bottom < 50) {
            clearInterval(timerDownId)
            isJumping = false
          }
          bottom -=5
          stickypete.style.bottom = bottom + 'px'
        },  15)
      }
      isJumping = true
      bottom += 30
      bottom = bottom * gravity
      stickypete.style.bottom = bottom + 'px'
    }, 15)
  }
  function slideLeft() {
    isGoingLeft = true
    leftTimerId = setInterval(function() { 
    left -=5
    if (left < 0) {
      left = 0
    }
    stickypete.style.left = left + 'px'
    }, 15) 
  }
  function slideRight() {
    isGoingRight = true
    rightTimerId = setInterval(function() { 
      left +=5
    if (left > 1100) {
      left = 1100
    }
    stickypete.style.left = left + 'px'
    }, 15) 
  }

  document.addEventListener('keydown', control)
  document.addEventListener('keyup', release)

  function control(e) {
    if (e.keyCode === 38) {
      jump(e)
    } else if (e.keyCode === 37) {
        if (!leftTimerId) {
        slideLeft()
      }
    } else if (e.keyCode === 39) {
        if (!rightTimerId) {
          slideRight()
        }
    }
  }
  //Key up control function
  function release(e) {
    if (e.keyCode === 37) {
    clearInterval(leftTimerId)
    leftTimerId=null
    } else if (e.keyCode === 39) {
    clearInterval(rightTimerId)
    rightTimerId=null
    }
  }  
  })
  //Key down release function