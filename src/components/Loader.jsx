const spinnerStyle = `
.loader {
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid white;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}
@keyframes l20-1{
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
}
@keyframes l20-2{ 
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
}`;

export const SmallSpinner = () => {
  return (
    <>
      <style>{spinnerStyle}</style>
      <div className="loader"></div>
    </>
  );
};

export const blue_spinnerStyle = `
.loader {
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid blue;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}
@keyframes l20-1{
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
}
@keyframes l20-2{ 
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
}`;

export const BlueSmallSpinner = () => {
  return (
    <>
      <style>{blue_spinnerStyle}</style>
      <div className="loader"></div>
    </>
  );
};

const Infinity_loader_style = `
.loader {
  height: 18px;
  width: 830px;
  --c:no-repeat linear-gradient(#A3CDFF 0 0);
  background: var(--c),var(--c),#EFEFEC;
  border-radius:10px;
  background-size: 60% 100%;
  animation: l16 7s infinite;
}
@keyframes l16 {
  0%   {background-position:-150% 0,-150% 0}
  66%  {background-position: 250% 0,-150% 0}
  100% {background-position: 250% 0, 250% 0}
}`;

export const InfinityLoader = () => {
  return (
    <>
      <style>{Infinity_loader_style}</style>
      <div className="loader"></div>
    </>
  );
};

export const InfinityBoxLoader = () => {
  return (
    <>
      <style> {InfinityBoxLoaderStyles}</style>
      <div className="boxes">
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="box">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </>
  );
};

const InfinityBoxLoaderStyles = `
  .boxes {
    --size: 32px;
    --duration: 800ms;
    height: calc(var(--size) * 2);
    width: calc(var(--size) * 3);
    position: relative;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    margin-top: calc(var(--size) * 1.5 * -1);
    transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
  }

  .boxes .box {
    width: var(--size);
    height: var(--size);
    top: 0;
    left: 0;
    position: absolute;
    transform-style: preserve-3d;
  }

  .boxes .box:nth-child(1) {
    transform: translate(100%, 0);
    -webkit-animation: box1 var(--duration) linear infinite;
    animation: box1 var(--duration) linear infinite;
  }

  .boxes .box:nth-child(2) {
    transform: translate(0, 100%);
    -webkit-animation: box2 var(--duration) linear infinite;
    animation: box2 var(--duration) linear infinite;
  }

  .boxes .box:nth-child(3) {
    transform: translate(100%, 100%);
    -webkit-animation: box3 var(--duration) linear infinite;
    animation: box3 var(--duration) linear infinite;
  }

  .boxes .box:nth-child(4) {
    transform: translate(200%, 0);
    -webkit-animation: box4 var(--duration) linear infinite;
    animation: box4 var(--duration) linear infinite;
  }

  .boxes .box > div {
    --background: #5C8DF6;
    --top: auto;
    --right: auto;
    --bottom: auto;
    --left: auto;
    --translateZ: calc(var(--size) / 2);
    --rotateY: 0deg;
    --rotateX: 0deg;
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--background);
    top: var(--top);
    right: var(--right);
    bottom: var(--bottom);
    left: var(--left);
    transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
  }

  .boxes .box > div:nth-child(1) {
    --top: 0;
    --left: 0;
  }

  .boxes .box > div:nth-child(2) {
    --background: #145af2;
    --right: 0;
    --rotateY: 90deg;
  }

  .boxes .box > div:nth-child(3) {
    --background: #447cf5;
    --rotateX: -90deg;
  }

  .boxes .box > div:nth-child(4) {
    --background: #DBE3F4;
    --top: 0;
    --left: 0;
    --translateZ: calc(var(--size) * 3 * -1);
  }

  @-webkit-keyframes box1 {
    0%, 50% {
      transform: translate(100%, 0);
    }

    100% {
      transform: translate(200%, 0);
    }
  }

  @keyframes box1 {
    0%, 50% {
      transform: translate(100%, 0);
    }

    100% {
      transform: translate(200%, 0);
    }
  }

  @-webkit-keyframes box2 {
    0% {
      transform: translate(0, 100%);
    }

    50% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(100%, 0);
    }
  }

  @keyframes box2 {
    0% {
      transform: translate(0, 100%);
    }

    50% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(100%, 0);
    }
  }

  @-webkit-keyframes box3 {
    0%, 50% {
      transform: translate(100%, 100%);
    }

    100% {
      transform: translate(0, 100%);
    }
  }

  @keyframes box3 {
    0%, 50% {
      transform: translate(100%, 100%);
    }

    100% {
      transform: translate(0, 100%);
    }
  }

  @-webkit-keyframes box4 {
    0% {
      transform: translate(200%, 0);
    }

    50% {
      transform: translate(200%, 100%);
    }

    100% {
      transform: translate(100%, 100%);
    }
  }

  @keyframes box4 {
    0% {
      transform: translate(200%, 0);
    }

    50% {
      transform: translate(200%, 100%);
    }

    100% {
      transform: translate(100%, 100%);
    }
  }`;

export const DeployLoaderBox = () => {
  return (
    <>
      <style>{DeployLoaderBoxStyle}</style>

      <div className="loader">
        <div className="box box0">
          <div />
        </div>
        <div className="box box1">
          <div />
        </div>
        <div className="box box2">
          <div />
        </div>
        <div className="box box3">
          <div />
        </div>
        <div className="box box4">
          <div />
        </div>
        <div className="box box5">
          <div />
        </div>
        <div className="box box6">
          <div />
        </div>
        <div className="box box7">
          <div />
        </div>
        <div className="ground">
          <div />
        </div>
      </div>
    </>
  );
};

const DeployLoaderBoxStyle = `
  .loader {
    --duration: 3s;
    --primary: rgba(39, 94, 254, 1);
    --primary-light: #2f71ff;
    --primary-rgba: rgba(39, 94, 254, 0);
    width: 200px;
    height: 320px;
    position: relative;
    transform-style: preserve-3d;
  }

  @media (max-width: 480px) {
    .loader {
      zoom: 0.44;
    }
  }

  .loader:before, .loader:after {
    --r: 20.5deg;
    content: "";
    width: 320px;
    height: 140px;
    position: absolute;
    right: 32%;
    bottom: -11px;
  /* change the back groung color on switching from light to dark mood */
    background: #e8e8e8;
    transform: translateZ(200px) rotate(var(--r));
    -webkit-animation: mask var(--duration) linear forwards infinite;
    animation: mask var(--duration) linear forwards infinite;
  }

  .loader:after {
    --r: -20.5deg;
    right: auto;
    left: 32%;
  }

  .loader .ground {
    position: absolute;
    left: -50px;
    bottom: -120px;
    transform-style: preserve-3d;
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
  }

  .loader .ground div {
    transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    width: 200px;
    height: 200px;
    background: var(--primary);
    background: linear-gradient(45deg, var(--primary) 0%, var(--primary) 50%, var(--primary-light) 50%, var(--primary-light) 100%);
    transform-style: preserve-3d;
    -webkit-animation: ground var(--duration) linear forwards infinite;
    animation: ground var(--duration) linear forwards infinite;
  }

  .loader .ground div:before, .loader .ground div:after {
    --rx: 90deg;
    --ry: 0deg;
    --x: 44px;
    --y: 162px;
    --z: -50px;
    content: "";
    width: 156px;
    height: 300px;
    opacity: 0;
    background: linear-gradient(var(--primary), var(--primary-rgba));
    position: absolute;
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
    -webkit-animation: ground-shine var(--duration) linear forwards infinite;
    animation: ground-shine var(--duration) linear forwards infinite;
  }

  .loader .ground div:after {
    --rx: 90deg;
    --ry: 90deg;
    --x: 0;
    --y: 177px;
    --z: 150px;
  }

  .loader .box {
    --x: 0;
    --y: 0;
    position: absolute;
    -webkit-animation: var(--duration) linear forwards infinite;
    animation: var(--duration) linear forwards infinite;
    transform: translate(var(--x), var(--y));
  }

  .loader .box div {
    background-color: var(--primary);
    width: 48px;
    height: 48px;
    position: relative;
    transform-style: preserve-3d;
    -webkit-animation: var(--duration) ease forwards infinite;
    animation: var(--duration) ease forwards infinite;
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
  }

  .loader .box div:before, .loader .box div:after {
    --rx: 90deg;
    --ry: 0deg;
    --z: 24px;
    --y: -24px;
    --x: 0;
    content: "";
    position: absolute;
    background-color: inherit;
    width: inherit;
    height: inherit;
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
    filter: brightness(var(--b, 1.2));
  }

  .loader .box div:after {
    --rx: 0deg;
    --ry: 90deg;
    --x: 24px;
    --y: 0;
    --b: 1.4;
  }

  .loader .box.box0 {
    --x: -220px;
    --y: -120px;
    left: 58px;
    top: 108px;
  }

  .loader .box.box1 {
    --x: -260px;
    --y: 120px;
    left: 25px;
    top: 120px;
  }

  .loader .box.box2 {
    --x: 120px;
    --y: -190px;
    left: 58px;
    top: 64px;
  }

  .loader .box.box3 {
    --x: 280px;
    --y: -40px;
    left: 91px;
    top: 120px;
  }

  .loader .box.box4 {
    --x: 60px;
    --y: 200px;
    left: 58px;
    top: 132px;
  }

  .loader .box.box5 {
    --x: -220px;
    --y: -120px;
    left: 25px;
    top: 76px;
  }

  .loader .box.box6 {
    --x: -260px;
    --y: 120px;
    left: 91px;
    top: 76px;
  }

  .loader .box.box7 {
    --x: -240px;
    --y: 200px;
    left: 58px;
    top: 87px;
  }

  .loader .box0 {
    -webkit-animation-name: box-move0;
    animation-name: box-move0;
  }

  .loader .box0 div {
    -webkit-animation-name: box-scale0;
    animation-name: box-scale0;
  }

  .loader .box1 {
    -webkit-animation-name: box-move1;
    animation-name: box-move1;
  }

  .loader .box1 div {
    -webkit-animation-name: box-scale1;
    animation-name: box-scale1;
  }

  .loader .box2 {
    -webkit-animation-name: box-move2;
    animation-name: box-move2;
  }

  .loader .box2 div {
    -webkit-animation-name: box-scale2;
    animation-name: box-scale2;
  }

  .loader .box3 {
    -webkit-animation-name: box-move3;
    animation-name: box-move3;
  }

  .loader .box3 div {
    -webkit-animation-name: box-scale3;
    animation-name: box-scale3;
  }

  .loader .box4 {
    -webkit-animation-name: box-move4;
    animation-name: box-move4;
  }

  .loader .box4 div {
    -webkit-animation-name: box-scale4;
    animation-name: box-scale4;
  }

  .loader .box5 {
    -webkit-animation-name: box-move5;
    animation-name: box-move5;
  }

  .loader .box5 div {
    -webkit-animation-name: box-scale5;
    animation-name: box-scale5;
  }

  .loader .box6 {
    -webkit-animation-name: box-move6;
    animation-name: box-move6;
  }

  .loader .box6 div {
    -webkit-animation-name: box-scale6;
    animation-name: box-scale6;
  }

  .loader .box7 {
    -webkit-animation-name: box-move7;
    animation-name: box-move7;
  }

  .loader .box7 div {
    -webkit-animation-name: box-scale7;
    animation-name: box-scale7;
  }

  @-webkit-keyframes box-move0 {
    12% {
      transform: translate(var(--x), var(--y));
    }

    25%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move0 {
    12% {
      transform: translate(var(--x), var(--y));
    }

    25%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale0 {
    6% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    14%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale0 {
    6% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    14%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move1 {
    16% {
      transform: translate(var(--x), var(--y));
    }

    29%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move1 {
    16% {
      transform: translate(var(--x), var(--y));
    }

    29%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale1 {
    10% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    18%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale1 {
    10% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    18%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move2 {
    20% {
      transform: translate(var(--x), var(--y));
    }

    33%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move2 {
    20% {
      transform: translate(var(--x), var(--y));
    }

    33%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale2 {
    14% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    22%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale2 {
    14% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    22%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move3 {
    24% {
      transform: translate(var(--x), var(--y));
    }

    37%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move3 {
    24% {
      transform: translate(var(--x), var(--y));
    }

    37%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale3 {
    18% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    26%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale3 {
    18% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    26%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move4 {
    28% {
      transform: translate(var(--x), var(--y));
    }

    41%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move4 {
    28% {
      transform: translate(var(--x), var(--y));
    }

    41%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale4 {
    22% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    30%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale4 {
    22% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    30%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move5 {
    32% {
      transform: translate(var(--x), var(--y));
    }

    45%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move5 {
    32% {
      transform: translate(var(--x), var(--y));
    }

    45%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale5 {
    26% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    34%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale5 {
    26% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    34%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move6 {
    36% {
      transform: translate(var(--x), var(--y));
    }

    49%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move6 {
    36% {
      transform: translate(var(--x), var(--y));
    }

    49%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale6 {
    30% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    38%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale6 {
    30% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    38%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move7 {
    40% {
      transform: translate(var(--x), var(--y));
    }

    53%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move7 {
    40% {
      transform: translate(var(--x), var(--y));
    }

    53%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale7 {
    34% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    42%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale7 {
    34% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    42%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes ground {
    0%, 65% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }

    75%, 90% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1);
    }

    100% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }
  }

  @keyframes ground {
    0%, 65% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }

    75%, 90% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1);
    }

    100% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }
  }

  @-webkit-keyframes ground-shine {
    0%, 70% {
      opacity: 0;
    }

    75%, 87% {
      opacity: 0.2;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes ground-shine {
    0%, 70% {
      opacity: 0;
    }

    75%, 87% {
      opacity: 0.2;
    }

    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes mask {
    0%, 65% {
      opacity: 0;
    }

    66%, 100% {
      opacity: 1;
    }
  }

  @keyframes mask {
    0%, 65% {
      opacity: 0;
    }

    66%, 100% {
      opacity: 1;
    }
  }`;

export const LayerLoaderBox = () => {
  return (
    <>
      <style>{LayerLoaderBoxStyle}</style>
      <span className="loader" />
    </>
  );
};

const LayerLoaderBoxStyle = `
  .loader {
    position: relative;
    width: 80px;
    height: 80px;
    background: #a19dad;
    transform: rotateX(65deg) rotate(45deg);
    // remove bellows command for perspective change
    //transform: perspective(200px) rotateX(65deg) rotate(45deg);
    color: #fff;
    animation: layers1 1s linear infinite alternate;
  }
  .loader:after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.7);
    animation: layerTr 1s linear infinite alternate;
  }

  @keyframes layers1 {
    0% {
      box-shadow: 0px 0px 0 0px;
    }
    90%,
    100% {
      box-shadow: 20px 20px 0 -4px;
    }
  }
  @keyframes layerTr {
    0% {
      transform: translate(0, 0) scale(1);
    }
    100% {
      transform: translate(-25px, -25px) scale(1);
    }
  }`;

export const BreathingLoader = () => {
  return (
    <>
      <style>{BreathingLoaderStyle}</style>
      <div className="loader">
        <div className="box">
          <div className="logo">
            {/* <svg  fill="currentColor" viewBox="0 0 94 94" className="svg"> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 10.550000190734863 209.5500030517578 38.900001525878906"
              data-asc="0.97"
              width="209.5500030517578"
              height="38.900001525878906"
            >
              <defs />
              <g>
                <g fill="#ffffff">
                  <g transform="translate(0, 0)">
                    <path d="M12.10 49.35Q6.50 49.35 3.33 46.98Q0.15 44.60 0 40.40L6.25 40.40Q6.40 41.80 7.80 42.95Q9.20 44.10 12.20 44.10Q14.70 44.10 16.18 43.20Q17.65 42.30 17.65 40.75Q17.65 39.40 16.53 38.60Q15.40 37.80 12.70 37.55L10.30 37.30Q5.75 36.80 3.30 34.70Q0.85 32.60 0.85 29.10Q0.85 26.30 2.25 24.40Q3.65 22.50 6.13 21.52Q8.60 20.55 11.80 20.55Q16.80 20.55 19.90 22.75Q23.00 24.95 23.15 29.20L16.90 29.20Q16.80 27.80 15.50 26.80Q14.20 25.80 11.75 25.80Q9.55 25.80 8.35 26.65Q7.15 27.50 7.15 28.85Q7.15 30.15 8.13 30.85Q9.10 31.55 11.30 31.80L13.70 32.05Q18.50 32.55 21.23 34.70Q23.95 36.85 23.95 40.50Q23.95 43.20 22.48 45.17Q21.00 47.15 18.35 48.25Q15.70 49.35 12.10 49.35ZM41.75 49.45Q38.20 49.45 35.63 48.25Q33.05 47.05 31.33 45.05Q29.60 43.05 28.75 40.55Q27.90 38.05 27.90 35.45L27.90 34.50Q27.90 31.75 28.78 29.22Q29.65 26.70 31.40 24.72Q33.15 22.75 35.73 21.57Q38.30 20.40 41.70 20.40Q45.25 20.40 48.05 21.77Q50.85 23.15 52.53 25.60Q54.20 28.05 54.40 31.30L47.65 31.30Q47.40 29.20 45.88 27.80Q44.35 26.40 41.70 26.40Q39.40 26.40 37.88 27.50Q36.35 28.60 35.60 30.52Q34.85 32.45 34.85 34.95Q34.85 37.35 35.58 39.30Q36.30 41.25 37.83 42.35Q39.35 43.45 41.75 43.45Q43.55 43.45 44.85 42.80Q46.15 42.15 46.93 41Q47.70 39.85 47.90 38.40L54.65 38.40Q54.45 41.70 52.73 44.17Q51 46.65 48.18 48.05Q45.35 49.45 41.75 49.45ZM61.50 48.50L61.50 21.35L68.45 21.35L68.45 48.50L61.50 48.50M57.70 26.55L57.70 21.35L68.45 21.35L68.45 26.55L57.70 26.55M64.05 18.10Q62 18.10 61.02 17.02Q60.05 15.95 60.05 14.30Q60.05 12.65 61.02 11.60Q62 10.55 64.05 10.55Q66.10 10.55 67.05 11.60Q68 12.65 68 14.30Q68 15.95 67.05 17.02Q66.10 18.10 64.05 18.10ZM81.90 48.50L73.40 21.35L80.55 21.35L88.70 48.50L81.90 48.50M83.95 48.50L83.95 42.80L91.30 42.80L91.30 48.50L83.95 48.50M86.70 48.50L93.70 21.35L100.40 21.35L93.05 48.50L86.70 48.50ZM117.20 49.45Q113.70 49.45 111.08 48.25Q108.45 47.05 106.73 45.02Q105.00 43 104.13 40.50Q103.25 38 103.25 35.40L103.25 34.45Q103.25 31.75 104.13 29.22Q105.00 26.70 106.73 24.72Q108.45 22.75 111.00 21.57Q113.55 20.40 116.90 20.40Q121.30 20.40 124.28 22.32Q127.25 24.25 128.75 27.38Q130.25 30.50 130.25 34.10L130.25 36.60L106.20 36.60L106.20 32.35L125.90 32.35L123.75 34.45Q123.75 31.85 123.00 30Q122.25 28.15 120.73 27.15Q119.20 26.15 116.90 26.15Q114.60 26.15 113.00 27.20Q111.40 28.25 110.58 30.22Q109.75 32.20 109.75 34.95Q109.75 37.50 110.55 39.48Q111.35 41.45 113.00 42.58Q114.65 43.70 117.20 43.70Q119.75 43.70 121.35 42.67Q122.95 41.65 123.40 40.15L129.80 40.15Q129.20 42.95 127.50 45.05Q125.80 47.15 123.18 48.30Q120.55 49.45 117.20 49.45ZM136.05 48.50L136.05 21.35L141.55 21.35L141.55 32.85L141.40 32.85Q141.40 27 143.90 24Q146.40 21 151.25 21L152.25 21L152.25 27.05L150.35 27.05Q146.85 27.05 144.93 28.92Q143.00 30.80 143.00 34.35L143.00 48.50L136.05 48.50ZM166.75 49.35Q161.15 49.35 157.98 46.98Q154.80 44.60 154.65 40.40L160.90 40.40Q161.05 41.80 162.45 42.95Q163.85 44.10 166.85 44.10Q169.35 44.10 170.83 43.20Q172.30 42.30 172.30 40.75Q172.30 39.40 171.18 38.60Q170.05 37.80 167.35 37.55L164.95 37.30Q160.40 36.80 157.95 34.70Q155.50 32.60 155.50 29.10Q155.50 26.30 156.90 24.40Q158.30 22.50 160.78 21.52Q163.25 20.55 166.45 20.55Q171.45 20.55 174.55 22.75Q177.65 24.95 177.80 29.20L171.55 29.20Q171.45 27.80 170.15 26.80Q168.85 25.80 166.40 25.80Q164.20 25.80 163.00 26.65Q161.80 27.50 161.80 28.85Q161.80 30.15 162.78 30.85Q163.75 31.55 165.95 31.80L168.35 32.05Q173.15 32.55 175.88 34.70Q178.60 36.85 178.60 40.50Q178.60 43.20 177.13 45.17Q175.65 47.15 173.00 48.25Q170.35 49.35 166.75 49.35ZM196.50 49.45Q193.00 49.45 190.38 48.25Q187.75 47.05 186.03 45.02Q184.30 43 183.43 40.50Q182.55 38 182.55 35.40L182.55 34.45Q182.55 31.75 183.43 29.22Q184.30 26.70 186.03 24.72Q187.75 22.75 190.30 21.57Q192.85 20.40 196.20 20.40Q200.60 20.40 203.58 22.32Q206.55 24.25 208.05 27.38Q209.55 30.50 209.55 34.10L209.55 36.60L185.50 36.60L185.50 32.35L205.20 32.35L203.05 34.45Q203.05 31.85 202.30 30Q201.55 28.15 200.03 27.15Q198.50 26.15 196.20 26.15Q193.90 26.15 192.30 27.20Q190.70 28.25 189.88 30.22Q189.05 32.20 189.05 34.95Q189.05 37.50 189.85 39.48Q190.65 41.45 192.30 42.58Q193.95 43.70 196.50 43.70Q199.05 43.70 200.65 42.67Q202.25 41.65 202.70 40.15L209.10 40.15Q208.50 42.95 206.80 45.05Q205.10 47.15 202.48 48.30Q199.85 49.45 196.50 49.45Z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
      </div>
    </>
  );
};

const BreathingLoaderStyle = `/* From Uiverse.io by Smit-Prajapati */ 
/* ▸ palette tweaks only — behaviour unchanged */
.loader{
  --size:350px;
  --duration:2s;

  /* NEW colours ↓ */
  --logo-color:#fff;                 /* text / logo now white */
  --background:linear-gradient(
     0deg,
     rgba(  0,102,255,.25) 0%,        /* deep blue 25 % opacity */
     rgba( 50,153,255,.25) 100%       /* lighter blue 25 % opacity */
  );
  height:var(--size);
  aspect-ratio:1;
  position:relative;
}

.loader .box{
  position:absolute;
  /* translucent blue fill */
  background:var(--background);
  border-radius:50%;
  border-top:1px solid rgba(0,102,255,1); /* bright blue outline */
  box-shadow:rgba(0,0,0,.3) 0 10px 10px 0;
  backdrop-filter:blur(5px);
  animation:ripple var(--duration) infinite ease-in-out;
}

/* the five concentric rings – only their outline alpha differs */
.loader .box:nth-child(1){inset:40%;z-index:99;}
.loader .box:nth-child(2){
  inset:30%;z-index:98;
  border-color:rgba(0,102,255,.8);
  animation-delay:.2s;
}
.loader .box:nth-child(3){
  inset:20%;z-index:97;
  border-color:rgba(0,102,255,.6);
  animation-delay:.4s;
}
.loader .box:nth-child(4){
  inset:10%;z-index:96;
  border-color:rgba(0,102,255,.4);
  animation-delay:.6s;
}
.loader .box:nth-child(5){
  inset:0; z-index:95;
  border-color:rgba(0,102,255,.25);
  animation-delay:.8s;
}

/* logo stays centred — just fills with white thanks to --logo-color */
.loader .logo{
  position:absolute;inset:0;
  display:grid;place-content:center;
  padding:10%;
}
.loader .logo svg{
  fill:var(--logo-color);
  width:100%;
  animation:color-change var(--duration) infinite ease-in-out;
}

/* keyframes identical to original */
@keyframes ripple{
  0%{transform:scale(1);box-shadow:rgba(0,0,0,.3) 0 10px 10px 0;}
  50%{transform:scale(1.3);box-shadow:rgba(0,0,0,.3) 0 30px 20px 0;}
  100%{transform:scale(1);box-shadow:rgba(0,0,0,.3) 0 10px 10px 0;}
}
@keyframes color-change{
  0%,100%{fill:var(--logo-color);}
  50%{fill:#e0e0ff;}  /* subtle flash — tweak or remove if undesired */
}
`;

export const DeployBoxWithoutBottomBox = () => {
  return (
    <>
      <style>{DeployBxWithoutBottomBoxStyle}</style>

      <div class="loader">
        <div class="box box0">
          <div></div>
        </div>
        <div class="box box1">
          <div></div>
        </div>
        <div class="box box2">
          <div></div>
        </div>
        <div class="box box3">
          <div></div>
        </div>
        <div class="box box4">
          <div></div>
        </div>
        <div class="box box5">
          <div></div>
        </div>
        <div class="box box6">
          <div></div>
        </div>
        <div class="box box7">
          <div></div>
        </div>
        <div class="ground">
          <div></div>
        </div>
      </div>
    </>
  );
};

const DeployBxWithoutBottomBoxStyle = `
 .loader {
    --duration: 3s;
    --primary: rgba(39, 94, 254, 1);
    --primary-light: #2f71ff;
    --primary-rgba: rgba(39, 94, 254, 0);
    width: 200px;
    height: 320px;
    position: relative;
    transform-style: preserve-3d;
  }

  @media (max-width: 480px) {
    .loader {
      zoom: 0.44;
    }
  }

  .loader:before, .loader:after {
    --r: 20.5deg;
    content: "";
    width: 320px;
    height: 140px;
    position: absolute;
    right: 32%;
    bottom: -11px;
  /* change the back groung color on switching from light to dark mood */
    background: #e8e8e8;
    transform: translateZ(200px) rotate(var(--r));
    -webkit-animation: mask var(--duration) linear forwards infinite;
    animation: mask var(--duration) linear forwards infinite;
  }

  .loader:after {
    --r: -20.5deg;
    right: auto;
    left: 32%;
  }

  .loader .ground {
    position: absolute;
    left: -50px;
    bottom: -120px;
    transform-style: preserve-3d;
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
  }

  .loader .ground div {
    transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    width: 200px;
    height: 200px;
    background: var(--primary);
    background: linear-gradient(45deg, var(--primary) 0%, var(--primary) 50%, var(--primary-light) 50%, var(--primary-light) 100%);
    transform-style: preserve-3d;
    -webkit-animation: ground var(--duration) linear forwards infinite;
    animation: ground var(--duration) linear forwards infinite;
  }

  .loader .ground div:before, .loader .ground div:after {
    --rx: 90deg;
    --ry: 0deg;
    --x: 44px;
    --y: 162px;
    --z: -50px;
    content: "";
    width: 156px;
    height: 300px;
    opacity: 0;
    background: linear-gradient(var(--primary), var(--primary-rgba));
    position: absolute;
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
    -webkit-animation: ground-shine var(--duration) linear forwards infinite;
    animation: ground-shine var(--duration) linear forwards infinite;
  }

  .loader .ground div:after {
    --rx: 90deg;
    --ry: 90deg;
    --x: 0;
    --y: 177px;
    --z: 150px;
  }

  .loader .box {
    --x: 0;
    --y: 0;
    position: absolute;
    -webkit-animation: var(--duration) linear forwards infinite;
    animation: var(--duration) linear forwards infinite;
    transform: translate(var(--x), var(--y));
  }

  .loader .box div {
    background-color: var(--primary);
    width: 48px;
    height: 48px;
    position: relative;
    transform-style: preserve-3d;
    -webkit-animation: var(--duration) ease forwards infinite;
    animation: var(--duration) ease forwards infinite;
    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
  }

  .loader .box div:before, .loader .box div:after {
    --rx: 90deg;
    --ry: 0deg;
    --z: 24px;
    --y: -24px;
    --x: 0;
    content: "";
    position: absolute;
    background-color: inherit;
    width: inherit;
    height: inherit;
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
    filter: brightness(var(--b, 1.2));
  }

  .loader .box div:after {
    --rx: 0deg;
    --ry: 90deg;
    --x: 24px;
    --y: 0;
    --b: 1.4;
  }

  .loader .box.box0 {
    --x: -220px;
    --y: -120px;
    left: 58px;
    top: 108px;
  }

  .loader .box.box1 {
    --x: -260px;
    --y: 120px;
    left: 25px;
    top: 120px;
  }

  .loader .box.box2 {
    --x: 120px;
    --y: -190px;
    left: 58px;
    top: 64px;
  }

  .loader .box.box3 {
    --x: 280px;
    --y: -40px;
    left: 91px;
    top: 120px;
  }

  .loader .box.box4 {
    --x: 60px;
    --y: 200px;
    left: 58px;
    top: 132px;
  }

  .loader .box.box5 {
    --x: -220px;
    --y: -120px;
    left: 25px;
    top: 76px;
  }

  .loader .box.box6 {
    --x: -260px;
    --y: 120px;
    left: 91px;
    top: 76px;
  }

  .loader .box.box7 {
    --x: -240px;
    --y: 200px;
    left: 58px;
    top: 87px;
  }

  .loader .box0 {
    -webkit-animation-name: box-move0;
    animation-name: box-move0;
  }

  .loader .box0 div {
    -webkit-animation-name: box-scale0;
    animation-name: box-scale0;
  }

  .loader .box1 {
    -webkit-animation-name: box-move1;
    animation-name: box-move1;
  }

  .loader .box1 div {
    -webkit-animation-name: box-scale1;
    animation-name: box-scale1;
  }

  .loader .box2 {
    -webkit-animation-name: box-move2;
    animation-name: box-move2;
  }

  .loader .box2 div {
    -webkit-animation-name: box-scale2;
    animation-name: box-scale2;
  }

  .loader .box3 {
    -webkit-animation-name: box-move3;
    animation-name: box-move3;
  }

  .loader .box3 div {
    -webkit-animation-name: box-scale3;
    animation-name: box-scale3;
  }

  .loader .box4 {
    -webkit-animation-name: box-move4;
    animation-name: box-move4;
  }

  .loader .box4 div {
    -webkit-animation-name: box-scale4;
    animation-name: box-scale4;
  }

  .loader .box5 {
    -webkit-animation-name: box-move5;
    animation-name: box-move5;
  }

  .loader .box5 div {
    -webkit-animation-name: box-scale5;
    animation-name: box-scale5;
  }

  .loader .box6 {
    -webkit-animation-name: box-move6;
    animation-name: box-move6;
  }

  .loader .box6 div {
    -webkit-animation-name: box-scale6;
    animation-name: box-scale6;
  }

  .loader .box7 {
    -webkit-animation-name: box-move7;
    animation-name: box-move7;
  }

  .loader .box7 div {
    -webkit-animation-name: box-scale7;
    animation-name: box-scale7;
  }

  @-webkit-keyframes box-move0 {
    12% {
      transform: translate(var(--x), var(--y));
    }

    25%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move0 {
    12% {
      transform: translate(var(--x), var(--y));
    }

    25%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale0 {
    6% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    14%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale0 {
    6% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    14%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move1 {
    16% {
      transform: translate(var(--x), var(--y));
    }

    29%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move1 {
    16% {
      transform: translate(var(--x), var(--y));
    }

    29%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale1 {
    10% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    18%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale1 {
    10% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    18%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move2 {
    20% {
      transform: translate(var(--x), var(--y));
    }

    33%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move2 {
    20% {
      transform: translate(var(--x), var(--y));
    }

    33%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale2 {
    14% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    22%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale2 {
    14% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    22%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move3 {
    24% {
      transform: translate(var(--x), var(--y));
    }

    37%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move3 {
    24% {
      transform: translate(var(--x), var(--y));
    }

    37%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale3 {
    18% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    26%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale3 {
    18% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    26%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move4 {
    28% {
      transform: translate(var(--x), var(--y));
    }

    41%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move4 {
    28% {
      transform: translate(var(--x), var(--y));
    }

    41%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale4 {
    22% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    30%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale4 {
    22% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    30%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move5 {
    32% {
      transform: translate(var(--x), var(--y));
    }

    45%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move5 {
    32% {
      transform: translate(var(--x), var(--y));
    }

    45%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale5 {
    26% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    34%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale5 {
    26% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    34%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move6 {
    36% {
      transform: translate(var(--x), var(--y));
    }

    49%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move6 {
    36% {
      transform: translate(var(--x), var(--y));
    }

    49%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale6 {
    30% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    38%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale6 {
    30% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    38%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes box-move7 {
    40% {
      transform: translate(var(--x), var(--y));
    }

    53%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @keyframes box-move7 {
    40% {
      transform: translate(var(--x), var(--y));
    }

    53%, 52% {
      transform: translate(0, 0);
    }

    80% {
      transform: translate(0, -32px);
    }

    90%, 100% {
      transform: translate(0, 188px);
    }
  }

  @-webkit-keyframes box-scale7 {
    34% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    42%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @keyframes box-scale7 {
    34% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
    }

    42%, 100% {
      transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
    }
  }

  @-webkit-keyframes ground {
    0%, 65% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }

    75%, 90% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1);
    }

    100% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }
  }

  @keyframes ground {
    0%, 65% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }

    75%, 90% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1);
    }

    100% {
      transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
    }
  }

  @-webkit-keyframes ground-shine {
    0%, 70% {
      opacity: 0;
    }

    75%, 87% {
      opacity: 0.2;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes ground-shine {
    0%, 70% {
      opacity: 0;
    }

    75%, 87% {
      opacity: 0.2;
    }

    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes mask {
    0%, 65% {
      opacity: 0;
    }

    66%, 100% {
      opacity: 1;
    }
  }

  @keyframes mask {
    0%, 65% {
      opacity: 0;
    }

    66%, 100% {
      opacity: 1;
    }
  }
 `;

export const FallingTileLoader = () => {
  return (
    <>
    <style>{FallingTileLoaderStyle}</style>
      <div className="loader">
        <div className="box box-1">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
        <div className="box box-2">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
        <div className="box box-3">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
        <div className="box box-4">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
      </div>
    </>
  );
}

const FallingTileLoaderStyle = `
  .loader {
    scale: 3;
    height: 50px;
    width: 40px;
  }

  .box {
    position: relative;
    opacity: 0;
    left: 10px;
  }

  .side-left {
    position: absolute;
    background-color: #286cb5;
    width: 19px;
    height: 5px;
    transform: skew(0deg, -25deg);
    top: 14px;
    left: 10px;
  }

  .side-right {
    position: absolute;
    background-color: #2f85e0;
    width: 19px;
    height: 5px;
    transform: skew(0deg, 25deg);
    top: 14px;
    left: -9px;
  }

  .side-top {
    position: absolute;
    background-color: #5fa8f5;
    width: 20px;
    height: 20px;
    rotate: 45deg;
    transform: skew(-20deg, -20deg);
  }

  .box-1 {
    animation: from-left 4s infinite;
  }

  .box-2 {
    animation: from-right 4s infinite;
    animation-delay: 1s;
  }

  .box-3 {
    animation: from-left 4s infinite;
    animation-delay: 2s;
  }

  .box-4 {
    animation: from-right 4s infinite;
    animation-delay: 3s;
  }

  @keyframes from-left {
    0% {
      z-index: 20;
      opacity: 0;
      translate: -20px -6px;
    }

    20% {
      z-index: 10;
      opacity: 1;
      translate: 0px 0px;
    }

    40% {
      z-index: 9;
      translate: 0px 4px;
    }

    60% {
      z-index: 8;
      translate: 0px 8px;
    }

    80% {
      z-index: 7;
      opacity: 1;
      translate: 0px 12px;
    }

    100% {
      z-index: 5;
      translate: 0px 30px;
      opacity: 0;
    }
  }

  @keyframes from-right {
    0% {
      z-index: 20;
      opacity: 0;
      translate: 20px -6px;
    }

    20% {
      z-index: 10;
      opacity: 1;
      translate: 0px 0px;
    }

    40% {
      z-index: 9;
      translate: 0px 4px;
    }

    60% {
      z-index: 8;
      translate: 0px 8px;
    }

    80% {
      z-index: 7;
      opacity: 1;
      translate: 0px 12px;
    }

    100% {
      z-index: 5;
      translate: 0px 30px;
      opacity: 0;
    }
  }`;

