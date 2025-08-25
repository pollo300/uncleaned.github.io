
////////////``````````````````````` ` ` `


window.addEventListener('DOMContentLoaded', function () {         // Disable right-click on the canvas
    canvas.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
});
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    camera.zoom = (canvas.width+canvas.height)/camera.fov;
});




document.addEventListener('mousemove', (e) => {
    //mouseClient = { x: e.clientX, y: e.clientY };  // Get the world position relative to the camera
    mouseClient.x = e.clientX;
    mouseClient.y = e.clientY;
});
document.addEventListener('mousedown', (e) => {
    mouseClient.pressed++
});
document.addEventListener('mouseup', (e) => {
    mouseClient.pressed = 0
});

canvas.addEventListener('keydown', (e) => {
    for (const k in BUTT_2){
        if(BUTT_2[k].val === e.code &&BUTT_2[k].val3<1){
            BUTT_2[k].val3 = 1
        }
    }
});
document.addEventListener('keyup', (e) => {
    for (const k in BUTT_2){
        if(BUTT_2[k].val === e.code){
            BUTT_2[k].val3 = 0
        }
    }
});
canvas.addEventListener('mousedown', (e) => {
    for (const k in BUTT_2){
        if(BUTT_2[k].val === e.button &&BUTT_2[k].val3<1){
            BUTT_2[k].val3 = 1
        }
    }
});
canvas.addEventListener('mouseup', (e) => {
    for (const k in BUTT_2){
        if(BUTT_2[k].val === e.button){
            BUTT_2[k].val3 = 0
        }
    }
});
canvas.addEventListener('wheel', (e) => {
})







/// ESSENTIAL
function getWorldMousePosition(mouseClient) {
    // Get mouse position in screen coordinates (relative to the canvas)
    let screenX = mouseClient.x;
    let screenY = mouseClient.y;
    // Translate the mouse position relative to the center of the screen
    screenX -= window.innerWidth / 2;
    screenY -= window.innerHeight / 2;
    // Undo the rotation by rotating the point in the opposite direction
    let radians = -camera.rotation * (Math.PI / 180);
    let rotatedX = screenX * Math.cos(radians) - screenY * Math.sin(radians);
    let rotatedY = screenX * Math.sin(radians) + screenY * Math.cos(radians);
    // Undo the zoom by dividing by the zoom level
    let worldX = rotatedX / camera.zoom;
    let worldY = rotatedY / camera.zoom;
    // Translate by the camera position to get the world coordinates
    worldX += camera.x;
    worldY += camera.y;
    x = parseFloat(worldX)
    y = parseFloat(worldY)
    return { x, y , old_x: mousePos.x, old_y: mousePos.y};
};
function Camera() {
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Center camera on the target (in this case, the first ball in COLLI_B array)
    camera.x = THE_PLAYER.pos.x;
    camera.y = THE_PLAYER.pos.y;
    // Reset the transformation matrix to the identity matrix before applying any transformations
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Translate to the center of the canvas, where you want zoom and rotation to be centered
    ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    // Apply the zoom, centered on the current focus point
    ctx.scale(camera.zoom, camera.zoom);
    // Apply rotation (convert degrees to radians), centered on the current focus point
    let radians = camera.rotation * (Math.PI / 180);
    ctx.rotate(radians);
    // After zoom and rotation, translate to the camera's position, taking into account zoom
    ctx.translate(-camera.x, -camera.y);
    // Now the canvas is set up to drw_2 with zoom and rotation centered
    //return
};






let THEME = [];
{
    let sky1 = {
        probability:6,
        gr0:{c:'#a7dfffff'},
        gr1:{c:'#85b8ffff'},
        mode_l:"multiply",
        gr2:{c:'rgba(255, 255, 255, 1)'},
        gr3:{c:'#e4dcff18'},
        snow:{c:'rgba(255, 255, 255, 0.22)'},
    }
    THEME.push(sky1)
    let defualt3 = {
        probability:2,
        gr0:{c:'#000000'},
        gr1:{c:'#2b2b2b'},
        mode_l:"multiply",
        gr2:{c:'#ffffff00'},
        gr3:{c:'#000000'},
        snow:{c:'rgba(182, 182, 182, 0.1)'},
    }
    THEME.push(defualt3)
    let defualt2 = {
        probability:8,
        gr0:{c:'#d8d8d8'},
        gr1:{c:'#ffffff'},
        mode_l:"multiply",
        gr2:{c:'#ffffff00'},
        gr3:{c:'#3a3a3a'},
        snow:{c:'rgba(57, 57, 57, 0.10)'},
    }
    THEME.push(defualt2)
        let defualt = {
        probability:8,
        gr0:{c:'#d1d1d1'},
        gr1:{c:'#ffffff'},
        mode_l:"multiply",
        gr2:{c:'#ffffff00'},
        gr3:{c:'#787878'},
        snow:{c:'rgba(151, 151, 151, 0.15)'},
    }
    THEME.push(defualt)
    let pinkgray = {
        probability:2,
        gr0:{c:'#90738a'},
        gr1:{c:'#3a2e3a'},
        mode_l:"color",      //"screen"
        gr2:{c:'rgba(0, 0, 0, 0)'},
        gr3:{c:'#533d74'},
        snow:{c:'rgba(101, 58, 86, 0.56)'},
    }
    THEME.push(pinkgray)
    let blood = {
        probability:1,
        gr0:{c:'#391010'},
        gr1:{c:'#281602'},
        mode_l:"hard-light",      //"screen"
        gr2:{c:'rgba(0, 0, 0, 0)'},
        gr3:{c:'#b10000'},
        snow:{c:'rgba(149, 74, 74, 0.56)'},
    }
    THEME.push(blood)
    let gray = {
        probability:6,
        gr0:{c:'#606060'},
        gr1:{c:'#212121'},
        mode_l:"color",      //"screen"
        gr2:{c:'rgba(0, 0, 0, 0)'},
        gr3:{c:'#a8a8a8'},
        snow:{c:'rgba(100, 100, 100, 0.24)'},
    }
    THEME.push(gray)
    let desert = {
        probability:3,
        gr0:{c:'#c0b47b'},
        gr1:{c:'#262b37'},
        mode_l:"color-dodge",      //"screen"
        gr2:{c:'rgb(48, 43, 73)'},
        gr3:{c:'#aa8f50'},
        snow:{c:'rgba(144, 141, 66, 0.56)'},
    }
    THEME.push(desert)
    let micro = {
        probability:3,
        gr0:{c:'#b8cec4'},
        gr1:{c:'#ffffff'},
        mode_l:"hard-light",      //"screen"
        gr2:{c:'rgb(127, 127, 127)'},
        gr3:{c:'#6f855c'},
        snow:{c:'rgba(27, 103, 0, 0.33)'},
    }
    THEME.push(micro)
    let snow = {
        probability:7,
        gr0:{c:'#d4d7e0'},
        gr1:{c:'#9196a6'},
        mode_l:"overlay",
        gr2:{c:'#e8f3ff00'},
        gr3:{c:'#e0e3ff'},
        snow:{c:'rgba(255, 255, 255, 0.76)'},
    }
    THEME.push(snow)
    let mint = {
        probability:1,
        gr0:{c:'#4f987a'},
        gr1:{c:'#561e62'},
        mode_l:"overlay",
        gr2:{c:'rgba(174, 158, 255, 0.34)'},
        gr3:{c:'#772976'},
        snow:{c:'rgba(0, 255, 106, 0.62)'},
    }
    THEME.push(mint)
    let end = {
        probability:1,
        gr0:{c:'#523855'},
        gr1:{c:'#28153a'},
        mode_l:"overlay",
        gr2:{c:'rgba(50, 0, 82, 0.37)'},
        gr3:{c:'#306c81'},
        snow:{c:'rgb(223, 240, 177)'},
    }
    THEME.push(end)
    let darkred = {
        probability:1,
        gr0:{c:'#000000'},
        gr1:{c:'#370000'},
        mode_l:"multiply",
        gr2:{c:'rgb(79, 65, 157)'},
        gr3:{c:'#640000'},
        snow:{c:'rgb(255, 0, 0)'},
    }
    THEME.push(darkred)
    let rock = {
        probability:2,
        gr0:{c:'#2f2920'},
        gr1:{c:'#392c20'},
        mode_l:"multiply",
        gr2:{c:'rgba(188, 171, 137, 0.12)'},
        gr3:{c:'#383027'},
        snow:{c:'rgba(122, 118, 108, 0.87)'},
    }
    THEME.push(rock)
    let grenn = {
        probability:1,
        gr0:{c:'#3f5538'},
        gr1:{c:'#172916'},
        mode_l:"multiply",
        gr2:{c:'rgba(216, 255, 220, 0.2)'},
        gr3:{c:'#a6ff00'},
        snow:{c:'rgba(71, 115, 0, 0.76)'},
    }
    THEME.push(grenn)
    let nether = {
        probability:1,
        gr0:{c:'#2f0000'},
        gr1:{c:'#5a0000'},
        mode_l:"multiply",
        gr2:{c:'rgba(200, 0, 0, 0.37)'},
        gr3:{c:'#ff9100'},
        snow:{c:'rgb(255, 191, 0)'},
    }
    THEME.push(nether)
    let abyss = {
        probability:1,
        gr0:{c:'#0a124a'},
        gr1:{c:'#010026'},
        mode_l:"multiply",
        gr2:{c:'rgba(0, 77, 160, 0.52)'},
        gr3:{c:'#000f92'},
        snow:{c:'rgba(81, 90, 110, 0.55)'},
    }
    THEME.push(abyss)
    let space = {
        probability:1,
        gr0:{c:'#000000'},
        gr1:{c:'#01003d'},
        mode_l:"multiply",
        gr2:{c:'#0c004600'},
        gr3:{c:'#0c002f'},
        snow:{c:'rgba(255, 255, 255, 0.77)'},
    }
    THEME.push(space)
}
THEME.sort((a,b) => b.probability*Math.random() - a.probability*Math.random())
DECORATIONS = [];
DECORATIONS_L = [];
function f_decoration(){
    ctx.beginPath();
    ctx.arc(
        (((0.5-(this.pos.x*this.z+camera.x/window.innerWidth*camera.zoom*this.z)%1))*window.innerWidth)/camera.zoom +camera.x,
        
        (((0.5-(this.pos.y*this.z+camera.y/window.innerHeight*camera.zoom*this.z)%1))*window.innerHeight)/camera.zoom  +camera.y,
        
        
        this.r/camera.zoom, 0, 2 * Math.PI);
    ctx.fillStyle = THEME[0].snow.c;
    ctx.fill();
    ctx.closePath();

    this.pos._add(this.vel.mult(this.z/window.innerHeight))
    this.pos.x = Math.abs(this.pos.x) 
    this.pos.y = Math.abs(this.pos.y) 
    this.vel._rotate((Math.random()-0.5)/7)
}
class Deco_0{
    constructor(){
        this.pos = new Vec(Math.random()*100.5,-100.5)
        this.vel = new Vec(Math.random(),Math.random())
        this.z = 0.4+0.8*(Math.random()**2)
        this.r = 0.6+this.z*(Math.random()/2+2)

        if(this.z>1){DECORATIONS_L.push(this)} else {DECORATIONS.push(this)}
    }
}
for (let i = 0; i < 122; i++) {
    let D = new Deco_0
    D.dec = f_decoration
}
function Background_a(){
    ctx.globalCompositeOperation = "source-over";
{    const grad = ctx.createRadialGradient(camera.x, camera.y, 0, camera.x, camera.y, canvas.clientWidth / camera.zoom);
    grad.addColorStop(0,THEME[0].gr0.c);
    grad.addColorStop(1,THEME[0].gr1.c);
    ctx.fillStyle = grad;
    ctx.fillRect(camera.x - canvas.clientWidth / 2 / camera.zoom, camera.y - canvas.clientHeight / 2 / camera.zoom, canvas.clientWidth / camera.zoom, canvas.clientHeight / camera.zoom);
}
DECORATIONS.forEach((d)=>{
    d.dec()
})
}
function Uppereffect_a(){
    DECORATIONS_L.forEach((d)=>{
        d.dec()
    })
    //    ctx.globalCompositeOperation = "screen";
   ctx.globalCompositeOperation = THEME[0].mode_l;
    {    const grad = ctx.createRadialGradient(camera.x, camera.y, 0, camera.x, camera.y, canvas.clientWidth / camera.zoom);
        grad.addColorStop(0,THEME[0].gr2.c);
        grad.addColorStop(1,THEME[0].gr3.c);
        ctx.fillStyle = grad;
        ctx.fillRect(camera.x - canvas.clientWidth / 2 / camera.zoom, camera.y - canvas.clientHeight / 2 / camera.zoom, canvas.clientWidth / camera.zoom, canvas.clientHeight / camera.zoom);
    }
}













function Camerazom(THE_PLAYER) {
    SCALLING(THE_PLAYER)
    camera.zoom = THE_PLAYER.fov
}
function MovePlayer() {
    for (const k in BUTT_2){
        if(BUTT_2[k].val3 > 0){
            BUTT_2[k].val3 ++
        } else {BUTT_2[k].val3--}
    }

    mousePos = getWorldMousePosition(mouseClient)
    THE_PLAYER.mouse.x = mouseClient.x
    THE_PLAYER.mouse.y = mouseClient.y

    let Nv = new Vec(0,0)
    if (BUTT_2.up.val3 > 0) {
        Nv.y += -1
    }
    if (BUTT_2.down.val3 > 0) {
        Nv.y += 1
    }
    if (BUTT_2.left.val3 > 0) {
        Nv.x += -1
    }
    if (BUTT_2.right.val3 > 0) {
        Nv.x += 1
    }
    Nv._unit()
    if(THE_PLAYER.hp <0) THE_PLAYER.pos._add(Nv.mult(5/camera.zoom))
    Nv._mult(THE_PLAYER.spead?? 0.2*THE_PLAYER.r/THE_PLAYER.frict)
    THE_PLAYER.vel._add(Nv)
    let SELECTED = []


    if (BUTT_2.create.val3 > 0) { 
        CreateBall();
    }
    if (BUTT_2.delete.val3 > 0) {
        let newAction = new Action_del(mousePos.x, mousePos.y);
        newAction.type = 1
        newAction.r = 30 / camera.zoom;
    }
    if (BUTT_2.zoom.val3 > 0) {
        camera.zoom *= 0.99;
    }
    if (BUTT_2.unzoom.val3 > 0) {
        camera.zoom *= 1.01;
    }
    if (BUTT_2.paste.val3 > 0) {

        if (!COPYPASTE) return
        if (!COPYPASTE.pos) return
        let CD = Deep_push(deepClone(COPYPASTE))

        let team = BUTT_1.team.ran==0? BUTT_1.team.val : BUTT_1.team.val + BUTT_1.team.ran*Math.random();
        if (team){CD.team = team}
        CD.pos = new Vec(0, 0)
        CD.pos.x = mousePos.x
        CD.pos.y = mousePos.y

    }
    THE_PLAYER.mouse.shoot = BUTT_2.shoot.val3
    THE_PLAYER.mouse.shoot2 = BUTT_2.shoot2.val3
    THE_PLAYER.mouse.ability = BUTT_2.ability.val3
    if (BUTT_2.shoot.val3 > 0) {
        THE_PLAYER.child.forEach(p => {
            p.active += 1
        })
    } else {
        THE_PLAYER.child.forEach(p => {
            p.active = 0
    })}
    if (BUTT_2.teleport.val3 == 2) {
            THE_PLAYER.pos.x = mousePos.x
            THE_PLAYER.pos.y = mousePos.y
    } else if(BUTT_2.teleport.val3 > 10){
        THE_PLAYER.pos.x = mousePos.x
        THE_PLAYER.pos.y = mousePos.y
    }

    if (BUTT_2.createNPC.val3 > 0) {
        let c = GEN_NPC(mousePos.x, mousePos.y)
        SCALE(c,BUTT_1.size.val/8)
        F_act_setup_growth(c,0.1)
        console.log(c)

    }
    if (BUTT_2.drag.val3 > 0) {
            c_act = function (a) {
                a.pos.x = a.pos_o.x - mousePos.old_x + mousePos.x
                a.pos.y = a.pos_o.y - mousePos.old_y + mousePos.y
                a.vel.x = (+mousePos.old_x - a.pos.x)*0.1
                a.vel.y = (+mousePos.old_y - a.pos.y)*0.1
                a.pos_o.x = a.pos.x
                a.pos_o.y = a.pos.y
            }
            new Action_0(mousePos.old_x, mousePos.old_y, c_act,12);
    }
    if (BUTT_2.select.val3 > 0) {
        c_act = function (a) {
            console.log(a)
            let A = deepClone(a);
            ARCHIVE(A)
            COPYPASTE = A
        }
        new Action_0(mousePos.x, mousePos.y, c_act,12);
    }
    if (BUTT_2.become.val3 > 0) {
        c_act = function (a) {
        THE_PLAYER = a
        a.mouse = {x:a.pos.x,y:a.pos.y}
        if (!THE_PLAYER.child) a.child = [];

        for (let i = 0; i < THE_PLAYER.child.length; i++) {
        const e = THE_PLAYER.child[i];
        if (e.target) e.DIE() // kill the ai

        }}
        new Action_0(mousePos.old_x, mousePos.old_y, c_act);
    }
}



function takecolor(){
    //*(Math.random()*2-1)
    let col = BUTT_1.color.val2.full_trasf(
        BUTT_1.color.val.rhu*(Math.random()*2-1),
        BUTT_1.color.val.sat*(Math.random()*2-1),
        BUTT_1.color.val.rli*(Math.random()*2-1),
        BUTT_1.color.val.rap*(Math.random()*2-1)
    )
    let bor = BUTT_1.bor_col.val2.full_trasf(
        BUTT_1.bor_col.val.rhu*(Math.random()*2-1),
        BUTT_1.bor_col.val.sat*(Math.random()*2-1),
        BUTT_1.bor_col.val.rli*(Math.random()*2-1),
        BUTT_1.bor_col.val.rap*(Math.random()*2-1)
    )
    return {color:col,bor_col:bor}
}

var Crat_Count = 0
function CreateBall() {
    // PUTTING SOMETING HERE  old bug: shared color
    //let col = takecolor()

    Crat_Count += BUTT_1.count.val
    if (Crat_Count < 0) return
    let amount = Crat_Count
    for (let i = 0; i < amount; i++){
        Crat_Count -= 1
    {
        let NB = {}

        /// Position and moviment
        NB.pos = new Vec(mousePos.x,mousePos.y)
        NB.pos_o = new Vec(mousePos.x,mousePos.y)
        NB.vel = new Vec(Math.random(),0)
        NB.vel._rotate(P2 * Math.random() * 4)

        NB.vel._add(new Vec(mousePos.x-mousePos.old_x,mousePos.y-mousePos.old_y))

        NB.frict = BUTT_1.frict.ran == 0 ? BUTT_1.frict.val : BUTT_1.frict.val + BUTT_1.frict.ran * Math.random();
       
        /// Size? + +
        NB.r = BUTT_1.size.ran == 0 ? BUTT_1.size.val : BUTT_1.size.val + BUTT_1.size.ran * Math.random();
        NB.m = BUTT_1.mass.ran == 0 ? BUTT_1.mass.val : BUTT_1.mass.val + BUTT_1.mass.ran * Math.random();
        NB.inv_m = 1 / NB.m
        // pysics on collision
        NB.elast = BUTT_1.elast.ran == 0 ? BUTT_1.elast.val : BUTT_1.elast.val + BUTT_1.elast.ran * Math.random();
        NB.hard = BUTT_1.hard.ran == 0 ? BUTT_1.hard.val : BUTT_1.hard.val + BUTT_1.hard.ran * Math.random();
        NB.slide = BUTT_1.push.ran == 0 ? BUTT_1.push.val : BUTT_1.push.val + BUTT_1.push.ran * Math.random();
        NB.stk = BUTT_1.stick.ran == 0 ? BUTT_1.stick.val : BUTT_1.stick.val + BUTT_1.stick.ran * Math.random();


        /// death management
        NB.age = 0
        NB.maxage = BUTT_1.age.ran == 0 ? BUTT_1.age.val : BUTT_1.age.val + BUTT_1.age.ran * Math.random();
        NB.hp = BUTT_1.HP.ran == 0 ? BUTT_1.HP.val : BUTT_1.HP.val + BUTT_1.HP.ran * Math.random();
        NB.maxhp = NB.hp
        NB.dmg = BUTT_1.dmg.ran == 0 ? BUTT_1.dmg.val : BUTT_1.dmg.val + BUTT_1.dmg.ran * Math.random();
        let regen = BUTT_1.regen.ran == 0 ? BUTT_1.regen.val : BUTT_1.regen.val + BUTT_1.regen.ran * Math.random();

        /// team/relation management
        NB.rank = BUTT_1.team.val
        NB.relat = {
            //0 = don't do //1 = do //-1 = don't do even if other do 2= do even if other is -1
            bou: 1,
            ing: 0,    // on equal ranks es: 2  other minion 
            bou_0: 1,
            ing_0: 1,    // on superior ranks es: 1 players
            bou_1: 1,
            ing_1: 0,    // on inferior ranks es: 3 bullets
            // cannot ingore differents team
        }
        NB.team = BUTT_1.team.val == 0 ? BUTT_1.color.val.hue + BUTT_1.color.val.red + BUTT_1.color.val.blc : BUTT_1.team.ran*Math.random() + BUTT_1.team.val

        // drawing
        let col = takecolor()
        NB.color = col.color
        NB.bor_col = col.bor_col
        Get_bor_s(NB)
        /////// drawing ++
        NB.DIE = DIE_2
        NB.DIE_anim = DIE_anim01

        ////// actions
if (false) {
            NB.arrays = [REPOS,KILLABLE,COLLI_BDMG]
            NB.child = []
            new cl_body(NB)
} else {
        NB.arrays = [REPOS,KILLABLE,COLLI_BDMG,DRW_2]
        NB.drw_2 = function() {
        drawBl01(NB);
        }
}


        Array_push(NB)

        ////// "" conponents 
    }
}




}

function GEN_NPC_old(st,x,y){

    let col = takecolor()

    NB = {}

    NB.mouse = {x:x,y:y,shoot:1,shoot2:1,ability:1}

    let team = BUTT_1.team.val == 0 ? BUTT_1.color.val.hue + BUTT_1.color.val.red + BUTT_1.color.val.blc : BUTT_1.team.ran*Math.random() + BUTT_1.team.val

    NB.team = team
    NB.color = col.color
    NB.bor_col = col.bor_col

    NB.pos = new Vec(x,y)
    NB.vel = new Vec(0,0.03)
    NB.elast = 0.3
    NB.hard = 0.3
    NB.slide = 0.04
    NB.stk = 0.2
    NB.rotation = Math.random() * 12
    NB.owner = NB;

        NB.r = 25
        NB.m = 23
        NB.inv_m = 1 / NB.m
        Get_bor_s(NB)

    let max = -st.move_acc/(st.move_max*20)+1
    NB.frict = max
    NB.spead = st.move_acc/2

    
    NB.fov = 500
    NB.maxhp = st.body_hp*200
    NB.dmg = st.body_dmg*2


    NB.hp = NB.maxhp * 0.8
    NB.age = 0
    NB.rank = 1
    NB.relat = {
        bou: 1,
        ing: 0,
        bou_0: 1,
        ing_0: 0,
        bou_1: 1,
        ing_1: 0,
    }
    NB.DIE = DIE_3
    NB.DIE_anim = DIE_anim01
    NB.arrays = [COLLI_BDMG, REPOS, KILLABLE]
    Array_push(NB)

    NB.child = [];
    
   new hp_diplay(NB)
   new cl_name(NB, F_get_randomname())
   new hp_regen(NB, st.body_reg*0.07)


    let calhp = Math.floor(st.body_hp*40-32)
    if (calhp > 0) {
        new cl_spike(NB, calhp + 1, 300, 1, 0.9, 0.8, true)
    }
    new cl_body(NB)
    {
        let size = st.gun_dmg*st.gun_hp*0.8 + 0.2
        let wp = {
            reload: st.gun_rel/120,
            recoil: 40*st.move_xxx*(Math.random()<0.5? 1:-1)/st.gun_rel,
            bl_n: 1,
            bl_sn: 1,
            internal_setup: gun_0_setup,
            setup_stats: {
                r: 0.5,
                rel_rot_max: 0.5
            }
        };
        let bl_st = {
            frict: 1, ///////------------
            r: size,
            m: 0.01,
            inv_m: 1 / 0.01,
            hard: 0.0,
            elast: 0,
            slide: 0,
            stk: 0,
            maxage: 200/st.gun_rel+80,
            hp: st.gun_hp*30,
            dmg: st.gun_dmg*6,
            arrays: [KILLABLE, DRW_2, COLLI_BDMG, REPOS],
            ran_rot: 0,//BL_ranDir,
            ran_vel: 0,//BL_ranVel,
            rel_rot: 0,//rel_rot, ?? not existent
            rel_vel: 12,//BL_SPEE,
            relat:{
                bou: 1,//0 = don't do //1 = do //-1 = don't do even if other do 2= do even if other is -1
                ing: 0,// on equal ranks es: 2  other minion 
                bou_0: 1,
                ing_0: 1,// on superior ranks es: 1 players
                bou_1: 1,
                ing_1: 0,// on inferior ranks es: 3 bullets    // cannot ingore differents team
            }
        }
        let gun = new gun0(NB, bl_st, wp)
        new cl_AI(NB,gun)

        let n = Math.floor((Math.random()**2)*20-10)
        for (let l = 1; l < n; l++) {

            bl_st.rel_rot += P2/n
            new gun0(NB, bl_st, wp)
        }



    }
    let Spick = Math.floor(st.body_dmg*16-6)
    if (Spick > 2) {
        new cl_spike(NB, Spick)
    }

    L(st)
    return NB
}
function Set_spead(NB,max,acc){
    max*=acc
    NB.frict = -1/(max+1)+1
    NB.spead = 1/acc
}


function GEN_NPC(x,y){

    let col = takecolor()
    let Bu = Bbuild_covertor()

    NB = {}

    NB.mouse = {x:x,y:y,shoot:1,shoot2:1,ability:1}

    let team = BUTT_1.team.val == 0 ? BUTT_1.color.val.hue + BUTT_1.color.val.red + BUTT_1.color.val.blc : BUTT_1.team.ran*Math.random() + BUTT_1.team.val

    NB.team = team
    NB.color = col.color
    NB.bor_col = col.bor_col

    NB.pos = new Vec(x,y)
    NB.vel = new Vec(0,0.03)
    NB.elast = 0.1
    NB.hard = 0.3
    NB.slide = 0.04
    NB.stk = 0.1
    NB.rotation = Math.random() * 12
    NB.owner = NB;

        NB.r = 25
        NB.m = 25
        NB.inv_m = 1 / NB.m
        Get_bor_s(NB)


    
    NB.frict = Bu.accel
    NB.spead = Bu.spead*(1-Bu.accel)

    
    NB.fov = Bu.fov
    NB.maxhp = Bu.healt
    NB.dmg = Bu.body_dmg


    NB.hp = NB.maxhp * 0.8
    NB.age = 0
    NB.rank = 1
    NB.relat = {
        bou: 1,
        ing: 0,
        bou_0: 1,
        ing_0: 0,
        bou_1: 1,
        ing_1: 0,
    }
    NB.DIE = DIE_3
    NB.DIE_anim = DIE_anim01
    NB.arrays = [COLLI_BDMG, REPOS, KILLABLE]
    Array_push(NB)

    NB.child = [];
    
   new hp_diplay(NB)
   new cl_name(NB, F_get_randomname())
   new hp_regen(NB, Bu.regen)


    let calhp = Math.floor(Bu.body_dmg)
    if (calhp > 0 && false) {
        new cl_spike(NB, calhp + 1, 300, 1, 0.9, 0.8, true)
    }




    //firepower distribution based on reload .- hp and dmg determine firepower, reload distribute it on bolth 2
    let invrelhalf = (1/Bu.reload)**0.5

    new cl_body(NB)
    { // weapon
        let size = Bu.b_size
        let wp = {
            reload: Bu.reload,
            recoil: 0,
            bl_n: 1,
            bl_sn: 1,
            internal_setup: gun_0_setup,
            setup_stats: {
                r: 0.5,
                rel_rot_max: 0.5
            }
        };
        let bl_st = {
            frict: Bu.b_range, ///////------------
            r: size,
            m: 1,
            inv_m: 1 / 1,
            hard: 0.1,
            elast: 0.1,
            slide: 0,
            stk: 0.1,
            maxage: Bu.b_time,
            hp: Bu.bullet_hp*invrelhalf,
            dmg: Bu.bullet_dmg*invrelhalf,
            arrays: [KILLABLE, DRW_2, COLLI_BDMG, REPOS],
            ran_rot: Bu.precision, // precisiona in radianti da da 0 a 2PI
            ran_vel: Bu.b_shoot*(1-Bu.b_spe_ran), // addizione di velocita
            rel_rot: 0,
            rel_vel: Bu.b_shoot*Bu.b_spe_ran,  // consigliato minimo 2 e massimo 30
            relat:{
                bou: 1,//0 = don't do //1 = do //-1 = don't do even if other do 2= do even if other is -1
                ing: 0,// on equal ranks es: 2  other minion 
                bou_0: 1,
                ing_0: 1,// on superior ranks es: 1 players
                bou_1: 1,
                ing_1: 0,// on inferior ranks es: 3 bullets    // cannot ingore differents team
            }
        }
        let gun = new gun0(NB, bl_st, wp)
        let AI = new cl_AI(NB,gun)
        AI.fov = Bu.fov
        AI.combact_range = Math.min((Bu.b_shoot * (Bu.b_range**2) * (Bu.b_time**0.8))/(1+Bu.precision), AI.fov);

        let n = Math.floor((Math.random()**2)*20-10)*0 + 1 // inactive !!!!!!!!!!
        for (let l = 1; l < n; l++) {

            bl_st.rel_rot += P2/n
            new gun0(NB, bl_st, wp)
        }
    }
    let Spick = Math.floor(Bu.healt)
    if (Spick > 2 && false) {
        new cl_spike(NB, Spick)
    }

    return NB
}