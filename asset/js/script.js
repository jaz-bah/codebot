//=====on load

//=====common
//navbar
$(".hamburger").click(() => {
  $(".nav_menu").toggleClass("active_nav_menu");
});

//======home
//robot
function activateFelix() {
  userMadeDecision = false;
  felix.classList.remove("inactive");
  felix.classList.add("active");
  setTimeout(function () {
    if (!userMadeDecision) {
      felix.classList.remove("active");
      felix.classList.add("inactive");
      setTimeout(function () {
        felix.classList.remove("inactive");
      }, 750);
    }
  }, 5000);
}

function deactivateFelix() {
  userMadeDecision = true;
  felix.classList.remove("active");
  felix.classList.add("inactive");
  setTimeout(function () {
    felix.classList.remove("inactive");
  }, 750);
}

//======storage
// code viewer
function RenderCode (code , index) {
  let value = Prism.highlight(code.code, Prism.languages[code.language], code.language);
  $('#codeContainer').append(
    `<div id=`+`codeOutputBox${index}`+`>
    <div class="code_bar">
        <ul>
            <li onclick=`+`copyContent(${index})`+`><i class='bx bx-copy'></i></li>
            <li onclick=`+`deleteContent(${index})`+`><i class='bx bx-trash'></i></li>
        </ul>
    </div>
      <pre class=`+`language-${code.language} code_box`+`>
        <code>${value}</code>
      </pre>
    </div>`
  );
}

//save code
$('#saveCode').click(()=>{
  let language = $('#languageInput').val();
  let newCodes = JSON.parse(localStorage.getItem("savedCodes") || "[]");
  let code = $('#codeInputBox').val();
  newCodes.push({
    language,
    code
  })
  localStorage.setItem("savedCodes", JSON.stringify(newCodes));
  RenderCode(newCodes[newCodes.length-1], newCodes.length-1);
  $('#languageInput').val('html');
  $('#codeInputBox').val('');
})

//copy code
function copyContent(index) {
  let newCodes = JSON.parse(localStorage.getItem("savedCodes") || "[]");
  navigator.clipboard.writeText(newCodes[index].code);
}

//delete code
function deleteContent(index) {
  let newCodes = JSON.parse(localStorage.getItem("savedCodes") || "[]");
  console.log(newCodes);
  newCodes.splice(index,1);
  localStorage.setItem("savedCodes", JSON.stringify(newCodes));
  $('#codeContainer').html('');
  newCodes.forEach((code, index)=> RenderCode(code, index));
}

//text area
$('#codeInputBox').click(()=>{
  if($('#codeInputBox').val() == ""){
    $('#codeInputBox').val('\n')
  }
});

//get data
$('.get_data_btn').click(()=>{
  let newCodes = localStorage.getItem("savedCodes");
  navigator.clipboard.writeText(newCodes);
});

//load data
$('#loadCodeBtn').click(()=>{
  let rowCodes = $('#loadCodeInput').val();
  localStorage.setItem("savedCodes", rowCodes);
  $('#loadCodeInput').val('');
  let newCodes = JSON.parse(rowCodes);
  $('#codeContainer').html('');
  newCodes.forEach((code, index)=> RenderCode(code, index));
})


//copy code
function copyExtension(value) {
  navigator.clipboard.writeText(value);
}


//======component

var components = {
  navbar1:[
  {
    language: 'html',
    code: `
<div class="section-navbar">
  <a href="#" class="logo">J<span>B</span></a>
  <i class="menu-toggle-btn fas fa-bars"></i>
  <div class="nav-menu">
    <a href="">Home</a>
    <a href="">About</a>
    <a href="">Project</a>
    <a href="">Contact</a>
  </div>
</div>
    `
  },
  {
    language: 'scss',
    code: `
.section-navbar{
  width: 100% ;
  height: 70px;
  background-color: #283747;
  padding-left: 20px;
  padding-right: 20px;
  .logo{
    font-size: 40px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    span{
      color: #000;
      cursor: pointer;
    }
  }
  .menu-toggle-btn{
    font-size: 40px;
    font-weight: bold;
    color: #fff;
    float: right;
    align-items: center;
    min-height: 70px;
    display: none;
  }
  .nav-menu{
    float: right;
    display: flex;
    align-items: center;
    min-height: 70px;
    a{
      color: #fff;
      margin-right: 10px;
      font-size: 15px;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
  .active{
    top: 70px !important;
  }
}
  
@media only screen and (max-width: 768px){
  .nav-menu{
    position: fixed;
    top: -100%;
    background-color: #283747;
    width: 100%;
    right: 0;
    display: block !important;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
    transition: all 0.5s ease-in-out;
    a{
      display: block !important;
      padding-top: 10px;
      text-align: center;
    }
  }
  .menu-toggle-btn{
    display: flex !important;
  }
}
    `
  },
  {
    language: 'javascript',
    code: `
$('.menu-toggle-btn').click(function(){
    $(this).toggleClass('fa-times');
    $('.nav-menu').toggleClass('active');
})
    `
  }
],

  navbar2:[
  {
    language: 'html',
    code: `
<nav class="navbar">
    <div class="container">
        <a href="#" class="logo">
            <div class="imgbox">
                <img src="asset/image/logo.png" alt="">
            </div>
        </a>
        <span class="hamburger">
            <i class='bx bx-menu'></i>
        </span>
        <ul class="nav_menu">
            <li><a href="">Home</a></li>
            <li><a href="">Tv Shows</a></li>
            <li><a href="">Movies</a></li>
            <li><a href="">New & Popular</a></li>
            <li><a href="">My List</a></li>
            <li><a href="">Browse</a></li>
        </ul>
    </div>
</nav>
    `
  },
  {
    language: 'scss',
    code: `
.navbar{
    width: 100%;
    background-color: cyan;
    position: relative;
    .logo{
        width: 20%;
    }
    .hamburger{
        font-size: 50px;
        display: none;
        color: #FFFFFF;
    }
    .nav_menu{
        display: flex;
        padding-top: 15px;
        li{
            a{
                font-family: $Poppins;
                font-weight: 500;
                font-size: 15px;
                letter-spacing: 0.15em;
                color: #FFFFFF;
                margin-right: 30px;
            }
        }
    }
}

@media only screen and (max-width: 912px){
    .navbar{
        .logo{
            width: 40%;
        }
        .hamburger{
            display: block;
        }
        .nav_menu{
            background-color: red;
            position: absolute;
            left: -100%;
            top: 100%;
            width: 100%;
            display: block;
            text-align: center;
            transition: all linear 0.5s;
            li{
                margin-bottom: 20px;
            }
        }
        .active_nav_menu{
            left: 0;
        }
    }
}
    `
  },
  {
    language: 'javascript',
    code: `
$('.hamburger').click(()=>{
    $('.nav_menu').toggleClass('active_nav_menu');
});
    `
  }
],

  navbar3:[
  {
    language: 'html',
    code: `
<nav class="navbar navbar-expand-md navbar-dark fixed-top navbar-style">
  <a class="navbar-brand offset-1" href="#">
    <h1 class="brand-style">Navbar</h1>
  </a>
  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav offset-1 offset-md-3 offset-lg-6">
      <li class="nav-item">
        <a class="nav-link item-style" href="#home">HOME</a>
      </li>
      <li class="nav-item">
        <a class="nav-link item-style" href="#course">COURSE</a>
      </li>
      <li class="nav-item">
        <a class="nav-link item-style" href="#protfolio">PROTFOLIO</a>
      </li>
      <li class="nav-item">
        <a class="nav-link item-style" href="#team">TEAM</a>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle item-style"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="#">Item 1</a></li>
          <li><a class="dropdown-item" href="#">Item 2</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">More</a></li>
        </ul>
      </li>
    </ul>
  </div>
</nav>
  
    `
  },
  {
    language: 'css',
    code: `
.navbar-style{
    background-color: black;
}
.brand-style{
    font-family: Gill Sans;
    font-weight: bold;
    font-size: 30px;
}
.item-style{
    font-family: monospace;
    font-size: 20px;
    color: white !important;
}
    `
  }
],

  hamburger1:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-1">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-1.is-active .line:nth-child(2) {
  opacity: 0;
}

#hamburger-1.is-active .line:nth-child(1) {
  transform: translateY(13px) rotate(45deg);
}

#hamburger-1.is-active .line:nth-child(3) {
  transform: translateY(-13px) rotate(-45deg);
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger2:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-2">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-2.is-active .line:nth-child(1) {
  transform: translateY(13px);
}

#hamburger-2.is-active .line:nth-child(3) {
  transform: translateY(-13px);
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger3:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-3">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-3.is-active .line:nth-child(1),
#hamburger-3.is-active .line:nth-child(3) {
  width: 40px;
}

#hamburger-3.is-active .line:nth-child(1) {
  transform: translateX(-10px) rotate(-45deg);
}

#hamburger-3.is-active .line:nth-child(3) {
  transform: translateX(-10px) rotate(45deg);
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger4:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-4">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-4.is-active .line:nth-child(1),
#hamburger-4.is-active .line:nth-child(3) {
  width: 40px;
}

#hamburger-4.is-active .line:nth-child(1) {
  transform: translateX(10px) rotate(45deg);
}

#hamburger-4.is-active .line:nth-child(3) {
  transform: translateX(10px) rotate(-45deg);
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger5:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-5">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-5.is-active {
  transform: rotate(90deg);
}

#hamburger-5.is-active .line:nth-child(2) {
  transition: none;
}

#hamburger-5 .line:nth-child(2) {
  transition-delay: 0.3s;
}

#hamburger-5.is-active .line:nth-child(2) {
  opacity: 0;
}

#hamburger-5.is-active .line:nth-child(1),
#hamburger-5.is-active .line:nth-child(3) {
  width: 35px;
  transform-origin: right;
}

#hamburger-5.is-active .line:nth-child(1) {
  transform: translateY(15px) rotate(45deg);
}

#hamburger-5.is-active .line:nth-child(3) {
  transform: translateY(-15px) rotate(-45deg);
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger6:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-6">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-6.is-active {
  transition: all 0.3s ease-in-out;
  transition-delay: 0.6s;
  transform: rotate(45deg);
}

#hamburger-6.is-active .line:nth-child(2) {
  width: 0px;
}

#hamburger-6.is-active .line:nth-child(1),
#hamburger-6.is-active .line:nth-child(3) {
  transition-delay: 0.3s;
}

#hamburger-6.is-active .line:nth-child(1) {
  transform: translateY(13px);
}

#hamburger-6.is-active .line:nth-child(3) {
  transform: translateY(-13px) rotate(90deg);
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger7:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-7">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-7.is-active .line:nth-child(1) {
  width: 30px;
}

#hamburger-7.is-active .line:nth-child(2) {
  width: 40px;
}

#hamburger-7.is-active .line {
  transform: rotate(30deg);
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger8:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-8">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-8.is-active .line:nth-child(2) {
  opacity: 0;
}

#hamburger-8.is-active .line:nth-child(1) {
  transform: translateY(13px);
}

#hamburger-8.is-active .line:nth-child(3) {
  transform: translateY(-13px) rotate(90deg);
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger9:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-9">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}
#hamburger-9 {
  position: relative;
  transition: all 0.3s ease-in-out;
}

#hamburger-9.is-active {
  transform: rotate(45deg);
}

#hamburger-9:before {
  content: "";
  position: absolute;
  box-sizing: border-box;
  width: 70px;
  height: 70px;
  border: 5px solid transparent;
  top: calc(50% - 35px);
  left: calc(50% - 35px);
  border-radius: 100%;
  transition: all 0.3s ease-in-out;
}

#hamburger-9.is-active:before {
  border: 5px solid #ecf0f1;
}

#hamburger-9.is-active .line {
  width: 35px;
}

#hamburger-9.is-active .line:nth-child(2) {
  opacity: 0;
}

#hamburger-9.is-active .line:nth-child(1) {
  transform: translateY(13px);
}

#hamburger-9.is-active .line:nth-child(3) {
  transform: translateY(-13px) rotate(90deg);
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger10:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-10">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-10 {
  transition: all 0.3s ease-in-out;
}

#hamburger-10.is-active {
  transform: rotate(90deg);
}

#hamburger-10.is-active .line:nth-child(1) {
  width: 30px;
}

#hamburger-10.is-active .line:nth-child(2) {
  width: 40px;
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger11:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-11 {
  transition: all 0.3s ease-in-out;
}

#hamburger-11.is-active {
  animation: smallbig 0.6s forwards;
}

@keyframes smallbig {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(0);
  }
}

#hamburger-11.is-active .line:nth-child(1),
#hamburger-11.is-active .line:nth-child(2),
#hamburger-11.is-active .line:nth-child(3) {
  transition-delay: 0.2s;
}

#hamburger-11.is-active .line:nth-child(2) {
  opacity: 0;
}

#hamburger-11.is-active .line:nth-child(1) {
  transform: translateY(13px) rotate(45deg);
}

#hamburger-11.is-active .line:nth-child(3) {
  transform: translateY(-13px) rotate(-45deg);
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger12:[
  {
    language: 'html',
    code: `
<div class="hamburger" id="hamburger-">
  <span class="line"></span>
  <span class="line"></span>
  <span class="line"></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.hamburger .line {
  width: 50px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover {
  cursor: pointer;
}

#hamburger-12.is-active .line:nth-child(1) {
  opacity: 0;
  transform: translateX(-100%);
}

#hamburger-12.is-active .line:nth-child(3) {
  opacity: 0;
  transform: translateX(100%);
}
    `
  },
  {
    language: 'javascript',
    code: `
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });
});
    `
  }
],

  hamburger13:[
  {
    language: 'html',
    code: `
<div class="button" id="nav-icon">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.button {
  width: 200px;
  height: 100px;
  margin-top: 100px;
  margin-right: 50px;
  transform: rotate(0deg);
  transition: all 0.5s ease;
  cursor: pointer;
}

.button span {
  display: block;
  position: absolute;
  height: 30px;
  width: 100%;
  background-color: #2980b9;
  border-radius: 15px;
  opacity: 1;
  left: 0;
  transition: all 0.5s ease;
}

#nav-icon span:nth-child(1) {
  top: 0;
}

#nav-icon span:nth-child(2),
#nav-icon span:nth-child(3) {
  top: 50%;
}

#nav-icon span:nth-child(4) {
  top: 100%;
}

#nav-icon.open span:nth-child(1),
#nav-icon.open span:nth-child(4) {
  transform: rotateY(360deg) scale3d(0, 0, 0);
  opacity: 0;
}

#nav-icon.open span:nth-child(2) {
  transform: rotateZ(45deg) rotateX(360deg);
  background-color: #e74c3c;
  width: 80%;
  left: 10%;
}

#nav-icon.open span:nth-child(3) {
  transform: rotateZ(-45deg) rotateX(360deg);
  background-color: #e74c3c;
  width: 80%;
  left: 10%;
}
    `
  },
  {
    language: 'javascript',
    code: `
$("#nav-icon").on("click", function (e) {
  $("#nav-icon").toggleClass("open");
  e.preventDefault();
});
    `
  }
],

  hamburger14:[
  {
    language: 'html',
    code: `
<div class="button" id="nav-icon-2">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
    `
  },
  {
    language: 'css',
    code: `
.button {
  width: 200px;
  height: 100px;
  margin-top: 100px;
  margin-right: 50px;
  transform: rotate(0deg);
  transition: all 0.5s ease;
  cursor: pointer;
}

.button span {
  display: block;
  position: absolute;
  height: 30px;
  width: 100%;
  background-color: #2980b9;
  border-radius: 15px;
  opacity: 1;
  left: 0;
  transition: all 0.5s ease;
}

#nav-icon-2 span:nth-child(1) {
  top: 0;
}

#nav-icon-2 span:nth-child(2) {
  top: 50%;
}

#nav-icon-2 span:nth-child(3) {
  top: 100%;
}

#nav-icon-2.open span:nth-child(1) {
  transform: rotateX(360deg) rotateZ(-40deg);
  background: #16a085;
  width: 50%;
  top: 30%;
  left: 30%;
}

#nav-icon-2.open span:nth-child(2) {
  transform: rotateX(-360deg) scale(0);
  opacity: 0;
}

#nav-icon-2.open span:nth-child(3) {
  transform: rotateX(360deg) rotateZ(40deg);
  background: #16a085;
  width: 50%;
  top: 75%;
  left: 30%;
}
    `
  },
  {
    language: 'javascript',
    code: `
$("#nav-icon").on("click", function (e) {
  $("#nav-icon-2").toggleClass("open");
  e.preventDefault();
});
    `
  }
],

hamburger15:[
  {
    language: 'html',
    code: `
<button class="menu" onclick="this.classList.toggle('opened');this.setAttribute('aria-expanded', this.classList.contains('opened'))" aria-label="Main Menu">
    <svg width="100" height="100" viewBox="0 0 100 100">
      <path class="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
      <path class="line line2" d="M 20,50 H 80" />
      <path class="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
    </svg>
</button>
    `
  },
  {
    language: 'css',
    code: `
.line {
  fill: none;
  stroke: black;
  stroke-width: 6;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
.line1 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
.line2 {
  stroke-dasharray: 60 60;
  stroke-width: 6;
}
.line3 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
.opened .line1 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}
.opened .line2 {
  stroke-dasharray: 1 60;
  stroke-dashoffset: -30;
  stroke-width: 6;
}
.opened .line3 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}
    `
  }
],

hamburger16:[
  {
    language: 'html',
    code: `
<svg class="ham hamRotate ham1" viewBox="0 0 100 100" width="80" onclick="this.classList.toggle('active')">
    <path class="line top" d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
    <path class="line middle" d="m 30,50 h 40" />
    <path class="line bottom" d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
</svg>
    `
  },
  {
    language: 'css',
    code: `
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #000;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham1 .top {
  stroke-dasharray: 40 139;
}
.ham1 .bottom {
  stroke-dasharray: 40 180;
}
.ham1.active .top {
  stroke-dashoffset: -98px;
}
.ham1.active .bottom {
  stroke-dashoffset: -138px;
}
    `
  }
],

hamburger17:[
  {
    language: 'html',
    code: `
<svg class="ham ham2" viewBox="0 0 100 100" width="80" onclick="this.classList.toggle('active')">
  <path class="line top" d="m 70,33 h -40 c -6.5909,0 -7.763966,-4.501509 -7.763966,-7.511428 0,-4.721448 3.376452,-9.583771 13.876919,-9.583771 14.786182,0 11.409257,14.896182 9.596449,21.970818 -1.812808,7.074636 -15.709402,12.124381 -15.709402,12.124381" />
  <path class="line middle" d="m 30,50 h 40" />
  <path class="line bottom" d="m 70,67 h -40 c -6.5909,0 -7.763966,4.501509 -7.763966,7.511428 0,4.721448 3.376452,9.583771 13.876919,9.583771 14.786182,0 11.409257,-14.896182 9.596449,-21.970818 -1.812808,-7.074636 -15.709402,-12.124381 -15.709402,-12.124381" />
</svg>
    `
  },
  {
    language: 'css',
    code: `
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #000;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham2 .top {
  stroke-dasharray: 40 121;
}
.ham2 .bottom {
  stroke-dasharray: 40 121;
}
.ham2.active .top {
  stroke-dashoffset: -102px;
}
.ham2.active .bottom {
  stroke-dashoffset: -102px;
}
    `
  }
],

hamburger18:[
  {
    language: 'html',
    code: `
<svg class="ham ham3" viewBox="0 0 100 100" width="80" onclick="this.classList.toggle('active')">
  <path class="line top" d="m 70,33 h -40 c -11.092231,0 11.883874,13.496726 -3.420361,12.956839 -0.962502,-2.089471 -2.222071,-3.282996 -4.545687,-3.282996 -2.323616,0 -5.113897,2.622752 -5.113897,7.071068 0,4.448316 2.080609,7.007933 5.555839,7.007933 2.401943,0 2.96769,-1.283974 4.166879,-3.282995 2.209342,0.273823 4.031294,1.642466 5.857227,-0.252538 v -13.005715 16.288404 h 7.653568" />
  <path class="line middle" d="m 70,50 h -40 c -5.6862,0 -8.534259,5.373483 -8.534259,11.551069 0,7.187738 3.499166,10.922274 13.131984,10.922274 11.021777,0 7.022787,-15.773343 15.531095,-15.773343 3.268142,0 5.177031,-2.159429 5.177031,-6.7 0,-4.540571 -1.766442,-7.33533 -5.087851,-7.326157 -3.321409,0.0092 -5.771288,2.789632 -5.771288,7.326157 0,4.536525 2.478983,6.805271 5.771288,6.7" />
  <path class="line bottom" d="m 70,67 h -40 c 0,0 -3.680675,0.737051 -3.660714,-3.517857 0.02541,-5.415597 3.391687,-10.357143 10.982142,-10.357143 4.048418,0 17.88928,0.178572 23.482143,0.178572 0,2.563604 2.451177,3.403635 4.642857,3.392857 2.19168,-0.01078 4.373905,-1.369814 4.375,-3.392857 0.0011,-2.023043 -1.924401,-2.589191 -4.553571,-4.107143 -2.62917,-1.517952 -4.196429,-1.799562 -4.196429,-3.660714 0,-1.861153 2.442181,-3.118811 4.196429,-3.035715 1.754248,0.0831 4.375,0.890841 4.375,3.125 2.628634,0 6.160714,0.267857 6.160714,0.267857 l -0.178571,-2.946428 10.178571,0 -10.178571,0 v 6.696428 l 8.928571,0 -8.928571,0 v 7.142858 l 10.178571,0 -10.178571,0" />
</svg>
    `
  },
  {
    language: 'css',
    code: `
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #000;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham3 .top {
  stroke-dasharray: 40 130;
}
.ham3 .middle {
  stroke-dasharray: 40 140;
}
.ham3 .bottom {
  stroke-dasharray: 40 205;
}
.ham3.active .top {
  stroke-dasharray: 75 130;
  stroke-dashoffset: -63px;
}
.ham3.active .middle {
  stroke-dashoffset: -102px;
}
.ham3.active .bottom {
  stroke-dasharray: 110 205;
  stroke-dashoffset: -86px;
}
    `
  }
],

hamburger19:[
  {
    language: 'html',
    code: `
<svg class="ham hamRotate ham4" viewBox="0 0 100 100" width="80" onclick="this.classList.toggle('active')">
  <path class="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
  <path class="line middle" d="m 70,50 h -40" />
  <path class="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
</svg>
    `
  },
  {
    language: 'css',
    code: `
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #000;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham4 .top {
  stroke-dasharray: 40 121;
}
.ham4 .bottom {
  stroke-dasharray: 40 121;
}
.ham4.active .top {
  stroke-dashoffset: -68px;
}
.ham4.active .bottom {
  stroke-dashoffset: -68px;
}
    `
  }
],

hamburger20:[
  {
    language: 'html',
    code: `
<svg class="ham hamRotate180 ham5" viewBox="0 0 100 100" width="80" onclick="this.classList.toggle('active')">
  <path class="line top" d="m 30,33 h 40 c 0,0 8.5,-0.68551 8.5,10.375 0,8.292653 -6.122707,9.002293 -8.5,6.625 l -11.071429,-11.071429" />
  <path class="line middle" d="m 70,50 h -40" />
  <path class="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.68551 8.5,-10.375 0,-8.292653 -6.122707,-9.002293 -8.5,-6.625 l -11.071429,11.071429" />
</svg>
    `
  },
  {
    language: 'css',
    code: `
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #000;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham5 .top {
  stroke-dasharray: 40 82;
}
.ham5 .bottom {
  stroke-dasharray: 40 82;
}
.ham5.active .top {
  stroke-dasharray: 14 82;
  stroke-dashoffset: -72px;
}
.ham5.active .bottom {
  stroke-dasharray: 14 82;
  stroke-dashoffset: -72px;
}
    `
  }
],

hamburger21:[
  {
    language: 'html',
    code: `
<svg class="ham ham6" viewBox="0 0 100 100" width="80" onclick="this.classList.toggle('active')">
  <path class="line top" d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272" />
  <path class="line middle" d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272" />
  <path class="line bottom" d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272" />
</svg>
    `
  },
  {
    language: 'css',
    code: `
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #000;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham6 .top {
  stroke-dasharray: 40 172;
}
.ham6 .middle {
  stroke-dasharray: 40 111;
}
.ham6 .bottom {
  stroke-dasharray: 40 172;
}
.ham6.active .top {
  stroke-dashoffset: -132px;
}
.ham6.active .middle {
  stroke-dashoffset: -71px;
}
.ham6.active .bottom {
  stroke-dashoffset: -132px;
}
    `
  }
],

hamburger22:[
  {
    language: 'html',
    code: `
<svg class="ham hamRotate ham7" viewBox="0 0 100 100" width="80" onclick="this.classList.toggle('active')">
  <path class="line top" d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013" />
  <path class="line middle" d="m 70,50 h -40" />
  <path class="line bottom" d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40" />
</svg>
    `
  },
  {
    language: 'css',
    code: `
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #000;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham7 .top {
  stroke-dasharray: 40 82;
}
.ham7 .middle {
  stroke-dasharray: 40 111;
}
.ham7 .bottom {
  stroke-dasharray: 40 161;
}
.ham7.active .top {
  stroke-dasharray: 17 82;
  stroke-dashoffset: -62px;
}
.ham7.active .middle {
  stroke-dashoffset: 23px;
}
.ham7.active .bottom {
  stroke-dashoffset: -83px;
}
    `
  }
],

hamburger23:[
  {
    language: 'html',
    code: `
<svg class="ham hamRotate ham8" viewBox="0 0 100 100" width="80" onclick="this.classList.toggle('active')">
  <path class="line top" d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
  <path class="line middle" d="m 30,50 h 40" />
  <path class="line bottom" d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
</svg>
    `
  },
  {
    language: 'css',
    code: `
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #000;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.ham8 .top {
  stroke-dasharray: 40 160;
}
.ham8 .middle {
  stroke-dasharray: 40 142;
  transform-origin: 50%;
  transition: transform 400ms;
}
.ham8 .bottom {
  stroke-dasharray: 40 85;
  transform-origin: 50%;
  transition: transform 400ms, stroke-dashoffset 400ms;
}
.ham8.active .top {
  stroke-dashoffset: -64px;
}
.ham8.active .middle {
  stroke-dashoffset: -20px;
  transform: rotate(90deg);
}
.ham8.active .bottom {
  stroke-dashoffset: -64px;
}
    `
  }
],

unfoldingModal:[
  {
    language: 'html',
    code: `
<div id="modal_container">
  <div class="modal_background">
    <div class="modal">
      <h2>I'm a Modal</h2>
      <p>Hear me roar.</p>
    </div>
  </div>
</div>
    `
  },
  {
    language: 'scss',
    code: `
#modal_container {
  position: fixed;
  display: table;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  transform: scale(0);
  z-index: 1;

  &.active_modal {
      transform: scaleY(0.01) scaleX(0);
      animation: unfoldIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

      .modal_background {
          .modal {
              transform: scale(0);
              animation: zoomIn 0.5s 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
          }
      }

      &.out {
          transform: scale(1);
          animation: unfoldOut 1s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

          .modal_background {
              .modal {
                  animation: zoomOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
              }
          }
      }
  }

  .modal_background {
      display: table-cell;
      background: rgba(0, 0, 0, 0.8);
      text-align: center;
      vertical-align: middle;

      .modal {
          background: white;
          padding: 50px;
          display: inline-block;
          border-radius: 3px;
          font-weight: 300;
          position: relative;

          h2 {
              font-size: 25px;
              line-height: 25px;
              margin-bottom: 15px;
          }

          p {
              font-size: 18px;
              line-height: 22px;
          }
      }
  }
}

@keyframes unfoldIn {
  0% {
      transform: scaleY(0.005) scaleX(0);
  }

  50% {
      transform: scaleY(0.005) scaleX(1);
  }

  100% {
      transform: scaleY(1) scaleX(1);
  }
}

@keyframes unfoldOut {
  0% {
      transform: scaleY(1) scaleX(1);
  }

  50% {
      transform: scaleY(0.005) scaleX(1);
  }

  100% {
      transform: scaleY(0.005) scaleX(0);
  }
}

@keyframes zoomIn {
  0% {
      transform: scale(0);
  }

  100% {
      transform: scale(1);
  }
}

@keyframes zoomOut {
  0% {
      transform: scale(1);
  }

  100% {
      transform: scale(0);
  }
}
    `
  },
  {
    language: 'javascript',
    code: `
$("//YOUR BUTTON").click(function () {
  $("#modal_container").removeAttr("class").addClass('active_modal');
  $("body").addClass("modal_active");
});

$("#modal_container").click(function () {
  $("#modal_container").addClass("out");
  $("body").removeClass("modal_active");
});
    `
  }
],

revealingModal:[
  {
    language: 'html',
    code: `
<div id="modal_container">
  <div class="modal_background">
    <div class="modal">
      <h2>I'm a Modal</h2>
      <p>Hear me roar.</p>
    </div>
  </div>
</div>
    `
  },
  {
    language: 'scss',
    code: `
#modal_container {
    position: fixed;
    display: table;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transform: scale(0);
    z-index: 1;

    &.active_modal {
        transform: scale(1);

        .modal_background {
            background: rgba(0, 0, 0, 0);
            animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

            .modal {
                opacity: 0;
                animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
        }

        +.content {
            animation: scaleBack 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }

        &.out {
            animation: quickScaleDown 0s 0.5s linear forwards;

            .modal_background {
                animation: fadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

                .modal {
                    animation: scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }
            }

            +.content {
                animation: scaleForward 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
        }
    }

    .modal_background {
        display: table-cell;
        background: rgba(0, 0, 0, 0.8);
        text-align: center;
        vertical-align: middle;

        .modal {
            background: white;
            padding: 50px;
            display: inline-block;
            border-radius: 3px;
            font-weight: 300;
            position: relative;

            h2 {
                font-size: 25px;
                line-height: 25px;
                margin-bottom: 15px;
            }

            p {
                font-size: 18px;
                line-height: 22px;
            }
        }
    }
}

@keyframes fadeIn {
    0% {
        background: rgba(0, 0, 0, 0);
    }

    100% {
        background: rgba(0, 0, 0, 0.7);
    }
}

@keyframes fadeOut {
    0% {
        background: rgba(0, 0, 0, 0.7);
    }

    100% {
        background: rgba(0, 0, 0, 0);
    }
}

@keyframes scaleUp {
    0% {
        transform: scale(0.8) translateY(1000px);
        opacity: 0;
    }

    100% {
        transform: scale(1) translateY(0px);
        opacity: 1;
    }
}

@keyframes scaleDown {
    0% {
        transform: scale(1) translateY(0px);
        opacity: 1;
    }

    100% {
        transform: scale(0.8) translateY(1000px);
        opacity: 0;
    }
}

@keyframes scaleBack {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0.85);
    }
}

@keyframes scaleForward {
    0% {
        transform: scale(0.85);
    }

    100% {
        transform: scale(1);
    }
}
    `
  },
  {
    language: 'javascript',
    code: `
$("//YOUR BUTTON").click(function () {
  $("#modal_container").removeAttr("class").addClass('active_modal');
  $("body").addClass("modal_active");
});

$("#modal_container").click(function () {
  $("#modal_container").addClass("out");
  $("body").removeClass("modal_active");
});
    `
  }
],

uncoveringModal:[
  {
    language: 'html',
    code: `
<div id="modal_container">
  <div class="modal_background">
    <div class="modal">
      <h2>I'm a Modal</h2>
      <p>Hear me roar.</p>
    </div>
  </div>
</div>
    `
  },
  {
    language: 'scss',
    code: `
#modal_container {
    position: fixed;
    display: table;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transform: scale(0);
    z-index: 1;

    &.active_modal {
        z-index: 0;
        transform: scale(1);

        .modal_background {
            background: rgba(0, 0, 0, 0.6);

            .modal {
                animation: moveUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
        }

        +.content {
            z-index: 1;
            animation: slideUpLarge 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }

        &.out {
            .modal_background {
                .modal {
                    animation: moveDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }
            }

            +.content {
                animation: slideDownLarge 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
        }
    }

    .modal_background {
        display: table-cell;
        background: rgba(0, 0, 0, 0.8);
        text-align: center;
        vertical-align: middle;

        .modal {
            background: white;
            padding: 50px;
            display: inline-block;
            border-radius: 3px;
            font-weight: 300;
            position: relative;

            h2 {
                font-size: 25px;
                line-height: 25px;
                margin-bottom: 15px;
            }

            p {
                font-size: 18px;
                line-height: 22px;
            }
        }
    }
}


@keyframes slideUpLarge {
    0% {
        transform: translateY(0%);
    }

    100% {
        transform: translateY(-100%);
    }
}

@keyframes slideDownLarge {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0%);
    }
}

@keyframes moveUp {
    0% {
        transform: translateY(150px);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes moveDown {
    0% {
        transform: translateY(0px);
    }

    100% {
        transform: translateY(150px);
    }
}
    `
  },
  {
    language: 'javascript',
    code: `
$("//YOUR BUTTON").click(function () {
  $("#modal_container").removeAttr("class").addClass('active_modal');
  $("body").addClass("modal_active");
});

$("#modal_container").click(function () {
  $("#modal_container").addClass("out");
  $("body").removeClass("modal_active");
});
    `
  }
],

blowUpModal:[
  {
    language: 'html',
    code: `
<div id="modal_container">
  <div class="modal_background">
    <div class="modal">
      <h2>I'm a Modal</h2>
      <p>Hear me roar.</p>
    </div>
  </div>
</div>
    `
  },
  {
    language: 'scss',
    code: `
#modal_container {
    position: fixed;
    display: table;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transform: scale(0);
    z-index: 1;

    &.active_modal {
        z-index: 0;
        transform: scale(1);

        .modal_background {
            background: rgba(0, 0, 0, 0.7);

            .modal {
                animation: blowUpModal 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
        }

        +.content {
            z-index: 1;
            animation: blowUpContent 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }

        &.out {
            .modal_background {
                .modal {
                    animation: blowUpModalTwo 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }
            }

            +.content {
                animation: blowUpContentTwo 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
        }
    }

    .modal_background {
        display: table-cell;
        background: rgba(0, 0, 0, 0.8);
        text-align: center;
        vertical-align: middle;

        .modal {
            background: white;
            padding: 50px;
            display: inline-block;
            border-radius: 3px;
            font-weight: 300;
            position: relative;

            h2 {
                font-size: 25px;
                line-height: 25px;
                margin-bottom: 15px;
            }

            p {
                font-size: 18px;
                line-height: 22px;
            }
        }
    }
}


@keyframes blowUpContent {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    99.9% {
        transform: scale(2);
        opacity: 0;
    }

    100% {
        transform: scale(0);
    }
}

@keyframes blowUpContentTwo {
    0% {
        transform: scale(2);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes blowUpModal {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes blowUpModalTwo {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(0);
        opacity: 0;
    }
}
    `
  },
  {
    language: 'javascript',
    code: `
$("//YOUR BUTTON").click(function () {
  $("#modal_container").removeAttr("class").addClass('active_modal');
  $("body").addClass("modal_active");
});

$("#modal_container").click(function () {
  $("#modal_container").addClass("out");
  $("body").removeClass("modal_active");
});
    `
  }
],

meepModal:[
  {
    language: 'html',
    code: `
<div id="modal_container">
  <div class="modal_background">
    <div class="modal">
      <h2>I'm a Modal</h2>
      <p>Hear me roar.</p>
    </div>
  </div>
</div>
    `
  },
  {
    language: 'scss',
    code: `
#modal_container {
    position: fixed;
    display: table;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transform: scale(0);
    z-index: 1;

    &.active_modal {
        transform: scale(1);

        .modal_background {
            background: rgba(0, 0, 0, 0);
            animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

            .modal {
                transform: translateX(-1500px);
                animation: roadRunnerIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
        }

        &.out {
            animation: quickScaleDown 0s 0.5s linear forwards;

            .modal_background {
                animation: fadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

                .modal {
                    animation: roadRunnerOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }
            }
        }
    }

    .modal_background {
        display: table-cell;
        background: rgba(0, 0, 0, 0.8);
        text-align: center;
        vertical-align: middle;

        .modal {
            background: white;
            padding: 50px;
            display: inline-block;
            border-radius: 3px;
            font-weight: 300;
            position: relative;

            h2 {
                font-size: 25px;
                line-height: 25px;
                margin-bottom: 15px;
            }

            p {
                font-size: 18px;
                line-height: 22px;
            }
        }
    }
}


@keyframes roadRunnerIn {
    0% {
        transform: translateX(-1500px) skewX(30deg) scaleX(1.3);
    }

    70% {
        transform: translateX(30px) skewX(0deg) scaleX(0.9);
    }

    100% {
        transform: translateX(0px) skewX(0deg) scaleX(1);
    }
}

@keyframes roadRunnerOut {
    0% {
        transform: translateX(0px) skewX(0deg) scaleX(1);
    }

    30% {
        transform: translateX(-30px) skewX(-5deg) scaleX(0.9);
    }

    100% {
        transform: translateX(1500px) skewX(30deg) scaleX(1.3);
    }
}

@keyframes fadeIn {
    0% {
        background: rgba(0, 0, 0, 0);
    }

    100% {
        background: rgba(0, 0, 0, 0.7);
    }
}

@keyframes fadeOut {
    0% {
        background: rgba(0, 0, 0, 0.7);
    }

    100% {
        background: rgba(0, 0, 0, 0);
    }
}

@keyframes quickScaleDown {
    0% {
        transform: scale(1);
    }

    99.9% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}
    `
  },
  {
    language: 'javascript',
    code: `
$("//YOUR BUTTON").click(function () {
  $("#modal_container").removeAttr("class").addClass('active_modal');
  $("body").addClass("modal_active");
});

$("#modal_container").click(function () {
  $("#modal_container").addClass("out");
  $("body").removeClass("modal_active");
});
    `
  }
],

sketchModal:[
  {
    language: 'html',
    code: `
<div id="modal_container">
  <div class="modal_background">
    <div class="modal">
      <h2>I'm a Modal</h2>
      <p>Hear me roar.</p>
      <svg class="modal_svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
            <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
      </svg>
    </div>
  </div>
</div>
    `
  },
  {
    language: 'scss',
    code: `
#modal_container {
    position: fixed;
    display: table;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transform: scale(0);
    z-index: 1;

    &.active_modal {
        transform: scale(1);

        .modal_background {
            background: rgba(0, 0, 0, 0);
            animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

            .modal {
                background-color: transparent;
                animation: modalFadeIn 0.5s 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

                h2,
                p {
                    opacity: 0;
                    position: relative;
                    animation: modalContentFadeIn 0.5s 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }

                .modal_svg {
                    rect {
                        animation: sketchIn 0.5s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                    }
                }
            }
        }

        &.out {
            animation: quickScaleDown 0s 0.5s linear forwards;

            .modal_background {
                animation: fadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

                .modal {
                    animation: modalFadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

                    h2,
                    p {
                        animation: modalContentFadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                    }

                    .modal_svg {
                        rect {
                            animation: sketchOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                        }
                    }
                }
            }
        }
    }

    .modal_background {
        display: table-cell;
        background: rgba(0, 0, 0, 0.8);
        text-align: center;
        vertical-align: middle;

        .modal {
            background: white;
            padding: 50px;
            display: inline-block;
            border-radius: 3px;
            font-weight: 300;
            position: relative;

            h2 {
                font-size: 25px;
                line-height: 25px;
                margin-bottom: 15px;
            }

            p {
                font-size: 18px;
                line-height: 22px;
            }

            .modal_svg {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                border-radius: 3px;

                rect {
                    stroke: #fff;
                    stroke-width: 2px;
                    stroke-dasharray: 778;
                    stroke-dashoffset: 778;
                }
            }
        }
    }
}


@keyframes fadeIn {
    0% {
        background: rgba(0, 0, 0, 0);
    }

    100% {
        background: rgba(0, 0, 0, 0.7);
    }
}

@keyframes fadeOut {
    0% {
        background: rgba(0, 0, 0, 0.7);
    }

    100% {
        background: rgba(0, 0, 0, 0);
    }
}

@keyframes quickScaleDown {
    0% {
        transform: scale(1);
    }

    99.9% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}

@keyframes sketchIn {
    0% {
        stroke-dashoffset: 778;
    }

    100% {
        stroke-dashoffset: 0;
    }
}

@keyframes sketchOut {
    0% {
        stroke-dashoffset: 0;
    }

    100% {
        stroke-dashoffset: 778;
    }
}

@keyframes modalFadeIn {
    0% {
        background-color: transparent;
    }

    100% {
        background-color: white;
    }
}

@keyframes modalFadeOut {
    0% {
        background-color: white;
    }

    100% {
        background-color: transparent;
    }
}

@keyframes modalContentFadeIn {
    0% {
        opacity: 0;
        top: -20px;
    }

    100% {
        opacity: 1;
        top: 0;
    }
}

@keyframes modalContentFadeOut {
    0% {
        opacity: 1;
        top: 0px;
    }

    100% {
        opacity: 0;
        top: -20px;
    }
}
    `
  },
  {
    language: 'javascript',
    code: `
$("//YOUR BUTTON").click(function () {
  $("#modal_container").removeAttr("class").addClass('active_modal');
  $("body").addClass("modal_active");
});

$("#modal_container").click(function () {
  $("#modal_container").addClass("out");
  $("body").removeClass("modal_active");
});
    `
  }
],

bondModal:[
  {
    language: 'html',
    code: `
<div id="modal_container">
  <div class="modal_background">
    <div class="modal">
      <h2>I'm a Modal</h2>
      <p>Hear me roar.</p>
    </div>
  </div>
</div>
    `
  },
  {
    language: 'scss',
    code: `
#modal_container {
    position: fixed;
    display: table;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transform: scale(0);
    z-index: 1;

    &.active_modal {
        transform: scale(1);

        .modal_background {
            background: rgba(0, 0, 0, 0);
            animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

            .modal {
                height: 75px;
                width: 75px;
                border-radius: 75px;
                overflow: hidden;
                animation: bondJamesBond 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

                h2,
                p {
                    opacity: 0;
                    position: relative;
                    animation: modalContentFadeIn 0.5s 1.4s linear forwards;
                }
            }
        }

        &.out {
            animation: slowFade 0.5s 1.5s linear forwards;

            .modal_background {
                background-color: rgba(0, 0, 0, 0.7);
                animation: fadeToRed 2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

                .modal {
                    border-radius: 3px;
                    height: 162px;
                    width: 227px;
                    animation: killShot 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

                    h2,
                    p {
                        animation: modalContentFadeOut 0.5s 0.5 cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                    }
                }
            }
        }
    }

    .modal_background {
        display: table-cell;
        background: rgba(0, 0, 0, 0.8);
        text-align: center;
        vertical-align: middle;

        .modal {
            background: white;
            padding: 50px;
            display: inline-block;
            border-radius: 3px;
            font-weight: 300;
            position: relative;

            h2 {
                font-size: 25px;
                line-height: 25px;
                margin-bottom: 15px;
            }

            p {
                font-size: 18px;
                line-height: 22px;
            }
        }
    }
}


@keyframes fadeIn {
    0% {
        background: rgba(0, 0, 0, 0);
    }

    100% {
        background: rgba(0, 0, 0, 0.7);
    }
}

@keyframes fadeOut {
    0% {
        background: rgba(0, 0, 0, 0.7);
    }

    100% {
        background: rgba(0, 0, 0, 0);
    }
}

@keyframes modalContentFadeIn {
    0% {
        opacity: 0;
        top: -20px;
    }

    100% {
        opacity: 1;
        top: 0;
    }
}

@keyframes modalContentFadeOut {
    0% {
        opacity: 1;
        top: 0px;
    }

    100% {
        opacity: 0;
        top: -20px;
    }
}

@keyframes bondJamesBond {
    0% {
        transform: translateX(1000px);
    }

    80% {
        transform: translateX(0px);
        border-radius: 75px;
        height: 75px;
        width: 75px;
    }

    90% {
        border-radius: 3px;
        height: 182px;
        width: 247px;
    }

    100% {
        border-radius: 3px;
        height: 162px;
        width: 227px;
    }
}

@keyframes killShot {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }

    100% {
        transform: translateY(300px) rotate(45deg);
        opacity: 0;
    }
}

@keyframes fadeToRed {
    0% {
        background-color: rgba(black, 0.6);
    }

    100% {
        background-color: rgba(red, 0.8);
    }
}

@keyframes slowFade {
    0% {
        opacity: 1;
    }

    99.9% {
        opacity: 0;
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}
    `
  },
  {
    language: 'javascript',
    code: `
$("//YOUR BUTTON").click(function () {
  $("#modal_container").removeAttr("class").addClass('active_modal');
  $("body").addClass("modal_active");
});

$("#modal_container").click(function () {
  $("#modal_container").addClass("out");
  $("body").removeClass("modal_active");
});
    `
  }
],



  name:[
  {
    language: 'html',
    code: `

    `
  },
  {
    language: 'scss',
    code: `

    `
  },
  {
    language: 'javascript',
    code: `

    `
  }
],
};

//render component
function RenderComponent (code , index, componentName) {
  let value = Prism.highlight(code.code, Prism.languages[code.language], code.language);
  $('#previewComponent').append(
    `<div class="col-12 col-md-4">
      <div id=`+`componentCodeOutputBox${index}`+`>
        <div class="code_bar">
            <ul>
                <li onclick=`+`copyComponentCode(`+`'${componentName}'`+`,`+`${index}`+`)`+`>
                  <i class='bx bx-copy'></i>
                </li>
            </ul>
        </div>
        <pre class=`+`language-${code.language} code_box`+`>
          <code>${value}</code>
        </pre>
      </div>
    </div>`
  );
}

//load component
function loadComponent(componentName){
  $('#previewComponentName').html('');
  $('#previewComponentName').text(componentName);
  $('#previewComponent').html('');
  components[componentName].forEach((item, index)=>{
    RenderComponent (item , index, componentName);
  });
  window.location.href = "#previewComponentName";
}

//copy component code
function copyComponentCode(componentName, index) {
  navigator.clipboard.writeText(components[componentName][index].code);
}



//======preset

var presets = [
  {
    title: "onclick",
    description: "jquery on click event",
    language: "javascript",
    code:`
$('#name').click(()=>{
  //write code here
})
  `
  },
  {
    title: "onReady",
    description: "jquery on window load event",
    language: "javascript",
    code:`
$( document ).ready(function() {
  //write your code here
});
  `
  },
  {
    title: "section schema",
    description: "section schema",
    language: "javascript",
    code:`
{
  "name": "",
  "settings": [],
  "presets": [
    {
      "name": ""
    }
  ]
}
  `
  },
]

//render preset
function renderPreset (code , index) {
  let value = Prism.highlight(code.code, Prism.languages[code.language], code.language);
  $('#presetContainer').append(
    `<div class="col-12 col-md-6 col-lg-4">
    <h2>${code.title}</h2>
    <div id=`+`presetOutputBox${index}`+`>
      <div class="code_bar">
          <ul>
              <li onclick=`+`copyPreset(${index})`+`><i class='bx bx-copy'></i></li>
          </ul>
      </div>
      <pre class=`+`language-${code.language} code_box`+`>
        <code>${value}</code>
      </pre>
    </div>
    <p>${code.description}</p>
    </div>`
  );
}

//copy preset
function copyPreset(index) {
  navigator.clipboard.writeText(presets[index].code);
}
















