document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector(".grid");
    const doodler=document.createElement('div')
    let startPoint=150
    let doodlerBottomSpace=startPoint;
    let doodlerLeftSpace=50
    let isGameOver=false;
    let platformCount=5
    let platforms=[];
    let upTimeId
    let downTimeId
    let isJumping = true
    let isGoingLeft=false
    let isGoingRight=false

    
    class platform{
        constructor(newPlatBottom){
            this.bottom=newPlatBottom
            this.left=Math.random()*315;
            this.visual=document.createElement('div')
            const visual=this.visual 
            visual.classList.add('platform')
            visual.style.left=this.left+'px';
            visual.style.bottom=this.bottom+'px';
            grid.appendChild(visual);
        }
    }
    function createPlatforms(){
        for(let i=0; i<platformCount;i++){
            let platGap=600/platformCount;
            let newPlatBottom=100+i*platGap;
            let newPlatform= new platform(newPlatBottom);
            platforms.push(newPlatform)
            console.log(platforms);

        }
    }

    function movePlatforms(){
        if(doodlerBottomSpace>200){
            platforms.forEach(platform=>{
                platform.bottom-=4;
                let visual = platform.visual;
                visual.style.bottom=platform.bottom+"px";
                if(platform.bottom<10){
                    let firstPlatform=platform[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    
                }
            })
        }
    }
    function createDoodler(){
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace=platforms[0].left
        doodler.style.left=doodlerLeftSpace+'px';
        doodler.style.bottom=doodlerBottomSpace+'px';
    }
    function jump(){
        clearInterval(downTimeId)
        isJumping=true;
        upTimeId=setInterval(function (){
            doodlerBottomSpace+=20;
            doodler.style.bottom=doodlerBottomSpace+'px';
            if(doodlerBottomSpace>startPoint+200){
                fall()
            }
        },30)
    }
    function fall(){
        isJumping=false
        clearInterval(upTimeId)
       
        downTimeId=setInterval(function (){
            doodlerBottomSpace-=5;
            doodler.style.bottom=doodlerBottomSpace+"px";
            if(doodlerBottomSpace<=0){
                gameOver()
            }
            platform.forEach(platform=>{
                if((doodlerBottomSpace>=platform.bottom)&&
                (doodlerBottomSpace<=platform.bottom+15)&&
                ((doodlerLeftSpace+60)>=platform.left) &&
                (doodlerLeftSpace<=(platform.left+85))&&!isJumping){
                    console.log("landed");
                    startPoint=doodlerBottomSpace
                    jump();
                }
            })
        },30)
    }
    function gameOver(){
        console.log("game over");
        isGameOver=true
        clearInterval(upTimeId)
        clearInterval(downTimeId)
    }
    
    function moveLeft(){
        if(isGoingRight){
            clearInterval(rightTimeId)
            isGoingRight=false
        }
        isGoingLeft=true
        leftTimeId=setInterval(function(){
            if(doodlerLeftSpace>=0){
                doodlerLeftSpace-=5
            doodler.style.left=doodlerLeftSpace+"px"
            }else moveRight()
        },30)
    }
    function moveRight(){
        if(isGoingLeft){
            clearInterval(leftTimeId)
            isGoingLeft=false
        }
        isGoingRight=true
        rightTimeId=setInterval(function(){
            if(doodlerLeftSpace<=340){
                doodlerLeftSpace+=5
            doodler.style.left=doodlerLeftSpace+"px"
            }else moveLeft()
        },30)
    }
    function moveStraight(){
        isGoingRight=false;
        isGoingLeft=false;
        clearInterval(rightTimeId);
        clearInterval(leftTimeId);
    }
    function control(e){
        if(e.key==="ArrowLeft"){
            moveLeft()

        }else if(e.key==="ArrowRight"){
            moveRight()

        }else if(e.key==="ArrowUp"){
            moveStraight()

        }
    }
    function start(){
        if(!isGameOver){
            createPlatforms();
            createDoodler();
            
            setInterval(movePlatforms,30);
            jump();
            document.addEventListener('keyup',control);
        }
    }
    start();
})