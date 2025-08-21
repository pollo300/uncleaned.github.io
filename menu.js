const menu = document.getElementById('menu');
const cmn = menu.getContext('2d');
window.addEventListener('DOMContentLoaded', function () {         // Disable right-click on the menu
    menu.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
});

//``````````````````
function L(L) { console.log(L) }
function P() { REPOS.splice(0, REPOS.length) }

var SIZE = (window.innerWidth/3+window.innerHeight)
var B_sizeX = SIZE*0.25/4
var B_sizeY = SIZE*0.25/6

var Rel_distX = 0
var Rel_distY = 0

var det_dX = 7
var det_dY = 7

window.addEventListener('resize', (e) => {


    SIZE = (window.innerWidth/3+window.innerHeight)
    B_sizeX = SIZE*0.25/4.5
    B_sizeY = SIZE*0.25/7
    B_sizeX = SIZE*0.25/4
    B_sizeY = SIZE*0.25/6
    menu.width = SIZE/30;
    menu.height = SIZE/30;
    Menu(e)
});

function M_close(){
    menu.width = SIZE/30;
    menu.height = SIZE/30;    
}
function M_open(){
    menu.width = SIZE*0.25;
    menu.height = SIZE*0.5;
}



function FULL(ARR,BUTT_n,start_y = 0, Max_for_line = 4){
    let count_X = 0
    let count_Y = start_y


    var BT = null
    for (const key in BUTT_n) {
        BT = BUTT_n[key];
        let B = new button(count_X, count_Y, 1, 1)

        for (const k in BUTT_n[key])
        {
            B[k] = BUTT_n[key][k]
        }
        BUTT_n[key]=B

        ARR.push(BUTT_n[key])
        BUTT_n[key].setup()
        BUTT_n[key].update()

        count_X ++
        if (count_X >= Max_for_line) {
            count_Y += 1;
            count_X = 0
        }
    }


    if(true){
        BUTT_0.controls.uncompatibles = [BUTT_0.balls,BUTT_0.guns]
        BUTT_0.guns.uncompatibles = [BUTT_0.balls,BUTT_0.controls]
        BUTT_0.balls.uncompatibles = [BUTT_0.guns,BUTT_0.controls]

    }
}
function Menu(e){
    cmn.clearRect(0, 0, canvas.width, canvas.height);
    button_act(e)
}
function button_act(AC) {


    if(BUTT_0.MENU.detect()){BUTT_0.MENU.t(AC)}
    if(!BUTT_0.MENU.val){M_close();return}
    BUTT_0.MENU.see();

    BUTT_0.controls.see();
    if(BUTT_0.controls.detect()){BUTT_0.controls.t(AC)}
    if (BUTT_0.controls.val) {
        BUTTONS2.forEach((b) => {
            b.see();
            if (b.detect()) { b.t(AC) }
        })
    }
    BUTT_0.balls.see();
    if(BUTT_0.balls.detect()){BUTT_0.balls.t(AC)}
    if (BUTT_0.balls.val) {
        BUTTONS1.forEach((b) => {
            b.see();
            if (b.detect()) { b.t(AC) }
        })
    }
    BUTT_0.guns.see();
    if(BUTT_0.guns.detect()){BUTT_0.guns.t(AC)}
    if (BUTT_0.guns.val) {
        BUTTONS3.forEach((b) => {
            b.see();
            if (b.detect()) { b.t(AC) }
        })
    }

}


const BUTTONS0 = [];
const BUTTONS1 = [];
const BUTTONS2 = [];
const BUTTONS3 = [];

class button{
    constructor(rex, rey, sx, sy){
        this.reX =rex
        this.reY =rey
        this.siX =sx
        this.siY =sy
        this.n = ':D'

        this.x = rex +sx/2
        this.y = rey +sy/2
        this.namesize = B_sizeY/ Math.max(2.4,this.n.length)


        this.act_on = 0
        this.edit_on = 'Name_de'
        this.color = 'rgba(255, 255, 255, 0.39)'
        this.see();
    }
    see(){
        cmn.beginPath();
        cmn.fillStyle = this.color;
        this.rectfill_s()
        cmn.fillStyle = '#000000';
        this.text()
        cmn.closePath();

    }
    see_selection(){

        cmn.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.rectfill()
        cmn.fillStyle = 'rgb(0, 0, 0)';
        this.rectfill_s()
        cmn.fillStyle = 'rgb(255, 255, 255)';
        this.text()
    }
    t(A){
    }
    detect(){
        if(
            mouseClient.x > this.reX*B_sizeX + det_dX &&
            mouseClient.x < this.siX*B_sizeX + this.reX*B_sizeX  +det_dX &&
            mouseClient.y > this.reY*B_sizeY + det_dY &&
            mouseClient.y < this.siY*B_sizeY + this.reY*B_sizeY  +det_dY
        )
        {
            this.see_selection()
            return true
        }
        return false
    }
    rectfill(){
        cmn.fillRect(this.reX*B_sizeX+Rel_distX, this.reY*B_sizeY+Rel_distY, this.siX*B_sizeX, this.siY*B_sizeY);
    }
    rectfill_s(){
        let borX = 0.05 * B_sizeX
        let borY = 0.05 * B_sizeY
        cmn.fillRect(this.reX*B_sizeX+Rel_distX+borX, this.reY*B_sizeY+Rel_distY+borY, this.siX*B_sizeX-borX*2, this.siY*B_sizeY-borY*2);
    }


    setup(){}
    update(){

        this.namesize = 1/Math.max(4.4,this.n.length)*1.7
        let count = `${this.val}`
        this.namesize2 = 1/Math.max(4.4,count.length)*1.7
    }
    update2(){

        this.namesize = 1/Math.max(4.4,this.n.length)*1.7
        let count = `${Math.floor(this.val*100)/100}`
        this.namesize2 = 1/Math.max(4.4,count.length)*1.7
    }
    text(){
        cmn.font = `bold ${this.namesize*B_sizeY}px Arial`;
        cmn.textAlign = "center";
        cmn.fillText(this.n, this.x*B_sizeX+Rel_distX, this.y*B_sizeY+Rel_distY);
        cmn.textAlign
    }
    text1(){
        cmn.font = `bold ${this.namesize*B_sizeY}px Arial`;
        cmn.textAlign = "center";
        cmn.fillText(this.n, this.x*B_sizeX+Rel_distX, this.y*B_sizeY+Rel_distY);
        cmn.textAlign
    }
    text2(){
        cmn.font = `bold ${this.namesize*B_sizeY}px Arial`;
        cmn.fillText(this.n, this.x*B_sizeX+Rel_distX, this.y*B_sizeY+Rel_distY);
        cmn.textAlign

        cmn.font = `bold ${this.namesize2*B_sizeY}px Arial`;
        cmn.textAlign = "center";
        cmn.fillText(this.val, this.x*B_sizeX+Rel_distX, this.y*B_sizeY+Rel_distY+B_sizeY*0.35);
        cmn.textAlign

    }
    text3(){
        cmn.font = `bold ${this.namesize*B_sizeY}px Arial`;
        cmn.textAlign = "center";
        cmn.fillText(this.n, this.x*B_sizeX+Rel_distX, this.y*B_sizeY+Rel_distY);
        cmn.textAlign

        cmn.font = `bold ${this.namesize2*B_sizeY}px Arial`;
        cmn.textAlign = "center";
        cmn.fillText(Math.floor(this.val*100)/100, this.x*B_sizeX+Rel_distX, this.y*B_sizeY+Rel_distY+B_sizeY*0.35);
        cmn.textAlign

    }
}
const BUTT_1 = {
    count: { n: 'count',setup:t_number_setup, val: 1, },
    size: { n: 'size',setup:t_number_setup, val: 8, },
    mass: { n: 'mass',setup:t_number_setup, val: 5, },
    frict: { n: 'frict',setup:t_number_setup, val: 0.95, },
    elast: { n: 'elast',setup:t_number_setup, val: 1, },
    stick: { n: 'stick',setup:t_number_setup, val: 0, },
    hard: { n: 'hard',setup:t_number_setup, val: 1, },
    push: { n: 'push',setup:t_number_setup, val: 0, },
    dmg: { n: 'dmg',setup:t_number_setup, val: 1, },
    HP: { n: 'HP',setup:t_number_setup, val: 100, },
    age: { n: 'age',setup:t_number_setup, val: 4900, },
    regen: { n: 'regen',setup:t_number_setup, val: 0.3, },
    team: { n: 'team',setup:t_number_setup, val: 0, },
    color: { n: 'color',setup:t_color_setup, val2: 0},
    bor_col: { n: 'bor_col',setup:t_color_setup, val2: 0},
    canv_test: { n: 'test',setup:t_canv0_setup},

    _HP: { n: 'HP',setup:t_number_setup, val: 0, },
    _SP: { n: 'SP',setup:t_number_setup, val: 0, },
    _DM: { n: 'DM',setup:t_number_setup, val: 0, },
    TOTAL: { n: 'TOTAL',setup:t_number_setup, val: 0, },


    b_HP: { n: 'b_HP',setup:t_number_setup, val: 0, },
    b_RE: { n: 'b_RE',setup:t_number_setup, val: 0, },
    b_DM: { n: 'b_DM',setup:t_number_setup, val: 0, },
    BODYP: { n: 'BODYP',setup:t_number_setup, val: 0, },

    g_HP: { n: 'g_HP',setup:t_number_setup, val: 0, },
    g_RE: { n: 'g_RE',setup:t_number_setup, val: 0, },
    g_DM: { n: 'g_DM',setup:t_number_setup, val: 0, },
    FIREP: { n: 'FIREP',setup:t_number_setup, val: 0, },

    _max: { n: '_max',setup:t_number_setup, val: 0, },
    _acc: { n: '_acc',setup:t_number_setup, val: 0, },
    _xxx: { n: '_xxx',setup:t_number_setup, val: 0, },
    SPE_P: { n: 'SPE_P',setup:t_number_setup, val: 0, },

};
BUTT_1.color.val2 = new RGBA(244,155,5)
BUTT_1.bor_col.val2 = new RGBA(1,0,0,0.7)

function t_number_setup(){
    this.ran = 0
    this.t = t_number
    this.text = this.text3
    this.update = this.update2
    if (!this.valMax){this.valMax = Infinity}
    if (!this.valMin){this.valMin = -Infinity}
    if (!this.scale){this.scale = 0.1}
}
function t_number(A){
    if(A.deltaY){
        this.val = this.val -this.val*Math.sign(A.deltaY)/16
    }

    if(A._from_mousedown){
        createPopup_N(this)
    }

    this.val = Math.max(this.valMin,Math.min(this.valMax,this.val))
    this.update()
}


function t_color0_setup(){
    this.val = {
        blc: Math.random(),
        red: Math.random(),
        hue: Math.random(),
        aph: 1,
        rli: 0,
        rhu: 0,
        sat: 0,
        rap: 0
    }
    this.t = t_color0
}
function t_color0(A){
    if(A._from_mousedown){
        createPopup_C0(this)
    }
    this.update()
}


function t_color_setup(){
    this.val = {
        blc: Math.random(),
        red: Math.random(),
        hue: Math.random(),
        aph: 1,
        rli: 0,
        rhu: 0,
        sat: 0,
        rap: 0
    }
    this.t = t_color
}
function t_color(A){
    if(A._from_mousedown){
        createPopup_C(this)
    }
    this.update()
}

function t_canv0_setup(){
    this.t = t_canv0
}
function t_canv0(A){
    if(A._from_mousedown){
        createPopup_CV0(this)
    }
    this.update()
}



const BUTT_0 = {
    MENU: { n: 'MENU' ,setup:t_menu_setup,val:false},
    controls: { n: 'keys' ,setup:t_toggle_setup,val:false},
    balls: { n: 'balls' ,setup:t_toggle_setup,val:true},
    guns: { n: 'guns' ,setup:t_toggle_setup,val:false},
}
function t_menu_setup(){
    this.drag = 0
    this.press = 1
    this.t = t_menu
    this.color = 'rgb(201, 248, 255)'
}
function t_menu(A){
    this.see_selection()


if(A.type == "mousedown"){
    this.drag = 1
    this.val? this.val = false : this.val = true
    this.press = 1
        M_open()
}


if(A.type == "mouseup"){
    this.drag = 0
}



}
function t_toggle_setup(){
    this.t = t_toggle
    if(this.val === true){
        this.color = 'rgb(148, 255, 159)'
    } else {
        this.color = 'rgb(255, 123, 87)'
        this.val = false
    }
    if (!this.uncompatibles) this.uncompatibles = [];

}
function t_toggle(A){
    this.see_selection()
if(A.type !== "mousedown") return

    if(this.val == true){
        this.val = false
        this.color = 'rgb(255, 123, 87)'
    } else {
        this.val = true
        this.color = 'rgb(148, 255, 159)'
    }


if(!this.val) return
this.uncompatibles.forEach((u)=>{
                u.val = false
                u.color = 'rgb(255, 123, 87)'
})
}
const BUTT_2 = { //prob
    up: {val3:0, n: 'up',setup:t_set_controll,val:'KeyW'},
    down: {val3:0, n: 'down',setup:t_set_controll,val:'KeyS'},
    left: {val3:0, n: 'left',setup:t_set_controll,val:'KeyA'},
    right: {val3:0, n: 'right',setup:t_set_controll,val:'KeyD'},
    ability: {val3:0, n: 'ability',setup:t_set_controll,val:'space'}, //spacebar?
    shoot: {val3:0, n: 'shoot',setup:t_set_controll,val:0},
    shoot2: {val3:0, n: 'shoot2',setup:t_set_controll,val:2},



    zoom: {n: 'zoom',setup:t_set_controll,val:'ArrowDown'},
    unzoom: {n: 'unzoom',setup:t_set_controll,val:'ArrowUp'},

    teleport: {n: 'teleport',setup:t_set_controll,val:'KeyT'},
    drag: {n: 'drag',setup:t_set_controll,val:1},
    paste: {n: 'paste',setup:t_set_controll,val:'KeyP'},
    create: {n: 'create',setup:t_set_controll,val:'KeyO'},
    createNPC: {n: 'new NPC',setup:t_set_controll,val:'KeyN'},
    become: {n: 'become',setup:t_set_controll,val:'KeyB'},
    delete: {n: 'delete',setup:t_set_controll,val:'Backspace'},
    select: {n: 'select',setup:t_set_controll,val:1},
    edit: {n: 'edit',setup:t_set_controll,val:undefined},
    archive: {n: 'archive',setup:t_set_controll,val:'Enter'},
    salve: {n: 'salve',setup:t_set_controll,val:undefined},


    future: {n: 'future',setup:t_set_controll,val:undefined},
    //GUI: {n: 'GUI',val:0,val3:0},
    Theme_edit: {n: 'Theme_edit',setup:t_color0_setup,val:undefined},
}
function t_set_controll(){
    this.val3 = 0
    this.t = t_control
this.text = this.text2
if(this.val == undefined || this.val == 'Escape') {this.val = '     '}
}
function t_control(A){


    if(this.val2 && 
        A._from_onkeydown ||
        A._from_mousedown
    ){
        this.val2 = false
        if(A.code)(this.val = A.code)
        if(A.buttons)(this.val = A.button)
        console.log(A)
     }


    if(
        A._from_onkeydown ||
        A._from_mousedown
         ){
         console.log(A)
         if(!this.val2){
             this.val2 = true
         }
     }

     if(this.val == undefined || this.val == 'Escape') {this.val = '     '}
     this.update()
     this.see_selection()
    
}









onkeydown = (e) => {
    e._from_onkeydown = true
    Menu(e)
};
onkeyup = (e) => {
    Menu(e)
};




let coldown_move = 0
document.addEventListener('mousemove', (e) => {
    if(mouseClient.pressed) {coldown_move++} else{coldown_move = 0}
    if (coldown_move > 7 && BUTT_0.MENU.drag) {
        menu.style.left = `${mouseClient.x -SIZE/60}px`;
        menu.style.top = `${mouseClient.y -SIZE/60}px`;
        det_dX = mouseClient.x -SIZE/60 + Rel_distX
        det_dY = mouseClient.y -SIZE/60 + Rel_distY
    }
    e._from_mousemove = true
    Menu(e)
});


menu.addEventListener('mousedown', (e) => {
    e._from_mousedown = true
    Menu(e)
});
menu.addEventListener('mouseup', (e) => {
    e._from_mouseup = true
    Menu(e)
});
menu.addEventListener('wheel', (e) => {
    Menu(e)
})




FULL(BUTTONS0,BUTT_0)
FULL(BUTTONS1,BUTT_1,2)
FULL(BUTTONS2,BUTT_2,2)



//let popupCounter = 0;
// Function to create a new popup
function createPopup(name = null,size_x = 220,size_y = 140,drag_size=20) {
    const popup = document.createElement('div');
   // popup.className = 'popupMenu';
    popup.id = `pop`;
    popup.style.left = `${mouseClient.x-7}px`;
    popup.style.top = `${mouseClient.y-7}px`; // Offset position for each new popup
    popup.style.width = `${size_x}px`;
    popup.style.height = `${size_y}px`;
    popup.style.height = `${size_y}px`;
    //popup.style.fontSize = `${SIZE*drag_size*size_y}px`
    popup.style.scale = `${SIZE/12}%`
    popup.style.backgroundColor = 'rgba(215, 215, 215, 0.2)'
    popup.style.border = '1px solid'
    popup.style.position = 'absolute'

    // Create popup header
    const header = document.createElement('div');
    header.style.backgroundColor = 'rgba(86, 86, 86, 0.43)'
    header.style.height = `${drag_size}px`;
    header.style.userSelect = 'none';

    // Close button
    const closeButton = document.createElement('span');
    closeButton.textContent = '‎ ✖ ‎';
    closeButton.style.color = 'rgb(255, 180, 175)'
    closeButton.onclick = () => {popup.remove()}; // Remove popup on click
    header.appendChild(closeButton);

    {
        const name0 = document.createElement('span');
        name0.textContent = `‎ ‎ ‎ ${name}`;
        header.appendChild(name0);   
    }


    popup.appendChild(header);
    document.body.appendChild(popup);
    enableDrag(popup, header);
    return popup
}
// Function to enable dragging for a popup
function enableDrag(popup, header) {
    let offsetX = 0, offsetY = 0, isDragging = false;
    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - popup.offsetLeft;
        offsetY = e.clientY - popup.offsetTop;
        header.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            popup.style.left = `${e.clientX - offsetX}px`;
            popup.style.top = `${e.clientY - offsetY}px`;
        }
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        header.style.cursor = 'grab';
    });
}






function createPopup_N(BUTTON) {
    const popup = createPopup(BUTTON.n)

    const min = document.createElement('input');
    min.type = 'button';
    min.value = -1;
    min.onclick = () => {BUTTON.val *=-1; val.value*=-1};
    popup.appendChild(min);

    const val = document.createElement('input');
    val.type = 'number';
    val.step = BUTTON.val/10;
    val.value = BUTTON.val;
    val.oninput = () => {BUTTON.val = val.value}
    popup.appendChild(val);

    const zer = document.createElement('input');
    zer.type = 'button';
    zer.value = '0-';
    zer.onclick = () => {BUTTON.ran =0; ran.value=0};
    popup.appendChild(zer);

    const ran = document.createElement('input');
    ran.type = 'number';
    ran.step = BUTTON.ran/10;
    ran.value = BUTTON.ran;
    ran.oninput = () => {BUTTON.ran = ran.value}
    popup.appendChild(ran);

}


function add_canvas_picker(popup, FUNCT, ST = Pikerstats) {
    const stats = structuredClone(ST)

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.width = stats.sx;
    canvas.height = stats.sy;
    canvas.style.left = `${stats.x}px`;
    canvas.style.top = `${stats.y}px`;
    canvas.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    // Append canvas to the popup
    popup.appendChild(canvas);
    stats.pressingHere = false;
    stats.cursorPosition = { x: stats.vx * stats.sx, y: stats.vy * stats.sy };
    console.log(stats.cursorPosition)
    stats.canvas = canvas
    stats.ctx = ctx
    // Ensure cursor stays within canvas bounds
    function clampCursor(x, y) {
        return {
            x: Math.min(Math.max(x, 0), width),
            y: Math.min(Math.max(y, 0), height),
        };
    }
    stats.draw_g = draw_g
    function draw_g() {
        const verticalGradient = ctx.createLinearGradient(0, 0, 0, height);
        const horizontalGradient = ctx.createLinearGradient(0, 0, width, 0);
        for (let i = 0; i < stats.colorX.length; i++) {
            horizontalGradient.addColorStop(i / (stats.colorX.length - 1), stats.colorX[i]);
        }
        for (let i = 0; i < stats.colorY.length; i++) {
            verticalGradient.addColorStop(i / (stats.colorY.length - 1), stats.colorY[i]);
        }
        ctx.fillStyle = verticalGradient;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = stats.mode_c;
        ctx.fillStyle = horizontalGradient;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = "source-over";
    }
    function draw_p() {
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.arc(stats.cursorPosition.x, stats.cursorPosition.y, 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    stats.draw_p = draw_p
    function draw() {
        ctx.clearRect(0, 0, width, height);
        draw_g();
        draw_p()
    }
    stats.draw = draw
    function update(Val_x = stats.cursorPosition.x / canvas.width, Val_y = stats.cursorPosition.y / canvas.height) {
        stats.vx = Val_x
        stats.vy = Val_y
        FUNCT(stats.vx, stats.vy, stats)
        draw();
    }
    stats.update = update
    function handleMouseMove(e) {
        if (stats.pressingHere) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / popup.style.scale;
            const mouseY = (e.clientY - rect.top) / popup.style.scale;

            stats.cursorPosition = clampCursor(mouseX, mouseY);
            stats.update()
        }
    }
    {canvas.addEventListener("mousedown", (e) => {
        stats.pressingHere = true;
        handleMouseMove(e); // Draw immediately on mouse down
    });
    document.addEventListener("mouseup", () => {
        stats.pressingHere = false;
    });
    document.addEventListener("mousemove", (e) => {
        handleMouseMove(e);
    });}
    return stats
}
function Color_changing_exe_rgba(execolor = "#ffbb32", apha = 1, hue_r = 0, light_r = 0, sat_r = 0, apha_r = 0) {
    // Convert HEX to RGB

    function hexToRgb(hex) {
        hex = hex.replace("#", "");
        const bigint = parseInt(hex, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    }
    // Parse initial color
    let { r, g, b } = hexToRgb(execolor);

    let gray = (r + g + b) / 3; //

    let maxc = Math.max(r,g,b)
    let minc = Math.min(r,g,b)
    let centergray = maxc/2 + minc/2
    let sat = maxc - minc

    let hu = {r:0,g:0,b:0}
    let norm = 0
    let ra_sat = 0

if (sat != 0) {
    let variat = {r:r-gray,g:g-gray,b:b-gray}
    let cap = Math.min(
        centergray-sat/2,
        (255-centergray) -sat/2
    )
    
    let max_sat_mult = 1+(cap/(sat/2))
    ra_sat = max_sat_mult*(Math.random())*sat_r + (1-sat_r)

    norm = -Math.min(variat.r,variat.g,variat.b)
    let max = Math.max(variat.r,variat.g,variat.b)

    variat.r+= norm
    variat.g+= norm
    variat.b+= norm

    hue_r = 1+ hue_r*(Math.random() -0.5);
    hue_r = hue_r % 1

    let prop = (-1.5+(variat.r + variat.g + variat.b)/max)/4.5 //0 on red  1 on magenta
    let hue = (hue_r % (1/6))*6













        let m0 = 1
        let m1 = hue
        let m2 = -hue*prop
    
        if(hue_r % (1/3)>1/6){
            hue = 1-hue
            let r_s = variat.r
            variat.r = variat.g
            variat.g = variat.b
            variat.b = r_s
            m1 = -hue*prop
            m2 = hue
        }
        if(hue_r>1/3){
            let r_s = variat.r
            variat.r = variat.g
            variat.g = variat.b
            variat.b = r_s
        }
        if(hue_r>2/3){
            let r_s = variat.r
            variat.r = variat.g
            variat.g = variat.b
            variat.b = r_s
        }
        hu.r += (variat.r)*m0
        hu.r += (variat.g)*m1
        hu.r += (variat.b)*m2
    
        hu.g += (variat.g)*m0
        hu.g += (variat.b)*m1
        hu.g += (variat.r)*m2
    
        hu.b += (variat.b)*m0
        hu.b += (variat.r)*m1
        hu.b += (variat.g)*m2
}

   gray = (Math.random()*(255+sat)-sat/2)*light_r + (1-light_r)*gray
   r = gray + (hu.r-norm)*ra_sat
   g = gray + (hu.g-norm)*ra_sat
   b = gray + (hu.b-norm)*ra_sat

    apha = Math.min(Math.max(apha - apha_r + Math.random()*apha_r, 0), 1);
    r = Math.min(Math.max(Math.round(r),0),255)
    g = Math.min(Math.max(Math.round(g),0),255)
    b = Math.min(Math.max(Math.round(b),0),255)

    return `rgba(${r},${g},${b},${apha.toFixed(2)})`;
}
function createPopup_C(BUTTON) {
    const popup = createPopup(BUTTON.n,220,140,20)
    let rand = Math.random()
    let DEF_COL = new RGBA(255,0,0,1).hue(BUTTON.val.hue??rand)
    let DEF0 = DEF_COL.edit(undefined,undefined,undefined,0)
    console.log(DEF_COL)

    let stats = {
        colorX : ['rgb(255, 255, 255)',DEF_COL.c],
        colorY : ['rgb(255, 255, 255)','rgb(0, 0, 0)'],
        mode_c:"multiply",
        sx:110,
        sy:120,
        x:0,
        y:20,
        vx:0.5,
        vy:0.5,
    }
    let Global_updates = function(st) {

        DEF_COL = new RGBA(255,0,0,1).hue(BUTTON.val.hue)
        NC = new RGBA(255,(1-BUTTON.val.red)*255,(1-BUTTON.val.red)*255,BUTTON.val.aph).hue(BUTTON.val.hue)
        BUTTON.val2 = NC.mult(BUTTON.val.blc)
        console.log(BUTT_1.color.val2)


        DEF0 = DEF_COL.edit(undefined,undefined,undefined,0)
        pik_core.colorX[1] = DEF_COL.c
        pik_aph.colorX[0] = DEF_COL.c;
        pik_aph.colorX[1] = DEF0.c
        pik_rli.colorX[0] = DEF_COL.c;
        pik_rli.colorX[1] = DEF0.c
        pik_sat.colorX[0] = DEF_COL.c;
        pik_sat.colorX[1] = DEF0.c
        pik_rhu.colorX[0] = DEF_COL.c;
        pik_rhu.colorX[1] = DEF0.c
        pik_rap.colorX[0] = DEF_COL.c;
        pik_rap.colorX[1] = DEF0.c
        pik_sat.colorY[1] = DEF_COL.c

        if (st != pik_hue)pik_hue.update();
        if (st != pik_core)pik_core.update();
        if (st != pik_aph)pik_aph.update();
        if (st != pik_rli)pik_rli.update();
        if (st != pik_rhu)pik_rhu.update();
        if (st != pik_sat)pik_sat.update();
        if (st != pik_rap)pik_rap.update();
    }
    let fn_def = function(st){
        st.cursorPosition.y= st.sy/2
        if (st.pressingHere) {
            Global_updates(st)
        }
    }
    let fn_core = function(x,y,st){
        BUTTON.val.blc = 1-y
        BUTTON.val.red = x
        if (st.pressingHere) {
            Global_updates(st)
        }
    }
    let fn_hue = function(x,y,st){
        BUTTON.val.hue = 1-x
        fn_def(st)
    }
    let fn_aph = function(x,y,st){
        BUTTON.val.aph = 1-x
        fn_def(st)
    }
    let fn_rli = function(x,y,st){
        BUTTON.val.rli = x
        fn_def(st)
    }
    let fn_rhu = function(x,y,st){
        BUTTON.val.rhu = x
        fn_def(st)
    }
    let fn_sat = function(x,y,st){
        BUTTON.val.sat = x
        fn_def(st)
    }
    let fn_rap = function(x,y,st){
        BUTTON.val.rap = x
        fn_def(st)
    }
    stats.vy = 1-BUTTON.val.blc
    stats.vx = BUTTON.val.red
    let pik_core = add_canvas_picker(popup,fn_core,stats)

    stats.x = 110
    stats.sy = 20
    stats.colorX = ['rgb(255, 0, 0)','rgb(255, 255, 0)','rgb(0, 255, 0)','rgb(0, 255, 255)','rgb(0, 0, 255)','rgb(255, 0, 255)','rgb(255, 0, 0)']
    stats.colorY = ['rgb(0, 0, 0)','rgb(0, 0, 0)']
    stats.mode_c = "screen"
    stats.vx = 1-BUTTON.val.hue
    let pik_hue = add_canvas_picker(popup,fn_hue,stats)


    stats.y +=stats.sy
    stats.mode_c = "source-over"
    stats.colorX = [DEF_COL.c,DEF0.c]
    stats.colorY = ['#000','#fff','#000','#fff','#000','#fff','#000','#fff']
    stats.vx = 1-BUTTON.val.aph
    let pik_aph = add_canvas_picker(popup,fn_aph,stats)


    stats.y +=stats.sy
    stats.colorX = [DEF_COL.c,DEF0.c]
    stats.colorY = ['#000','#fff']
    stats.vx = BUTTON.val.rli
    let pik_rli = add_canvas_picker(popup,fn_rli,stats)

    stats.y +=stats.sy
    stats.colorX = [DEF_COL.c,DEF0.c]
    stats.colorY = ['rgb(255, 0, 0)','rgb(255, 255, 0)','rgb(0, 255, 0)','rgb(0, 255, 255)','rgb(0, 0, 255)','rgb(255, 0, 255)','rgb(255, 0, 0)']
    stats.vx = BUTTON.val.rhu
    let pik_rhu = add_canvas_picker(popup,fn_rhu,stats)

    stats.y +=stats.sy
    stats.colorX = [DEF_COL.c,DEF0.c]
    stats.colorY = ["#7a7a7a",DEF_COL.c]
    stats.vx = BUTTON.val.sat
    let pik_sat = add_canvas_picker(popup,fn_sat,stats)

    stats.y +=stats.sy
    stats.colorX = [DEF_COL.c,DEF0.c]
    stats.colorY = ['#000','#7770','#fff']
    stats.vx = BUTTON.val.rap
    let pik_rap = add_canvas_picker(popup,fn_rap,stats)


    pik_core.update();
    pik_hue.update();
    pik_aph.update();
    pik_rli.update();
    pik_rhu.update();
    pik_sat.update();
    pik_rap.update();

}

const Gen_st = {
    power:1,
    gen_gun:0.5,
    gen_bod:0.5,

    gun_dmg:0.5,
    gun_hp:0.5,

    gun_rvel:0.5,
    gun_rrot:0.5,

    body_dmg:0.5,
    body_hp:0.5,

    move_acc :0.5,
    move_max :0.5,

    mate_1:0.5,
    mate_2:0.5,
}
function Global_generator(g = Gen_st){

    let move = (1-(Math.max(g.gen_bod,g.gen_gun)))
    let exeed = 1-(g.gen_bod+g.gen_gun+move)

    let body_mult = g.gen_bod+ exeed/2
    let gun_mult = g.gen_gun+ exeed/2
    let move_mult = move


    body_mult =+0.6 + 0.4*body_mult
    gun_mult = ((Math.sin(gun_mult*Math.PI/2))**(1-(gun_mult**0.2)))*0.8+gun_mult*0.2
    move_mult = (0.8+move_mult*0.2)**2


    //////////////
    let bo_hp = g.body_hp*0.4+0.6
    let bo_dmg = g.body_dmg*0.4+0.6
    let bo_reg = 1/(bo_hp*bo_dmg**3)
    //////////////
    let WP_bias = (1/32)**0.5
    let wp_hp = g.gun_dmg+WP_bias
    let wp_dmg = g.gun_hp+WP_bias
    let wp_rel = 1/(wp_hp*wp_dmg)
    //////////////
    let move_acc = g.move_acc*0.95+0.05
    let move_max = g.move_max*0.65+0.35


    let mo_xxx = 1/(move_acc*move_max)
    //////////////////
    return {


        body:body_mult,
        body_hp:bo_hp,
        body_dmg:bo_dmg*body_mult,
        body_reg:bo_reg*body_mult,

        gun:gun_mult,
        gun_hp:wp_hp,
        gun_dmg:wp_dmg*gun_mult,
        gun_rel:wp_rel,

        move:move_mult,
        move_max: move_max*move_mult,
        move_acc: move_acc,
        move_xxx: mo_xxx,

    }
}
var GENERAT = Global_generator(Gen_st);
function createPopup_CV0(BUTTON) {
    const popup = createPopup(BUTTON.n,220,260,20)


    let stats = {
        colorY : ['rgb(0, 255, 0)','rgb(0, 0, 0)'],
        colorX : ['rgb(255, 0, 0)','rgb(0, 43, 108)'],
        mode_c:"screen",
        sx:110,
        sy:120,
        x:0,
        y:20,
        vx:0.5,
        vy:0.5,
    }
    function Global_updates(st) {
            if (st != pik_core)pik_core.update();
            if (st != pik_body)pik_body.update();
            if (st != pik_guns)pik_guns.update();
            if (st != pik_move)pik_move.update();
    }
    let fn_core = function(x,y,st){
        Gen_st.gen_bod = 1-y
        Gen_st.gen_gun = 1-x

        if (st.pressingHere) {
            Global_updates(st)
        }
        let g = Global_generator(Gen_st)
        BUTT_1._HP.val = g.body
        BUTT_1._DM.val = g.gun
        BUTT_1._SP.val = g.move
        BUTT_1.TOTAL.val = g.body+g.gun+g.move

        GENERAT = g
    }
    let fn_body = function(x,y,st){

        Gen_st.body_dmg = y
        Gen_st.body_hp = x

        if (st.pressingHere) {
            Global_updates(st)
        }
        let g = Global_generator(Gen_st)

        BUTT_1.b_HP.val = g.body_hp
        BUTT_1.b_DM.val = g.body_dmg
        BUTT_1.b_RE.val = g.body_reg

        BUTT_1.BODYP.val = g.body_dmg*g.body_hp,2
        BUTT_1.BODYP.n = `${Math.floor(g.body_dmg*g.body_reg*100)/100} dps`

        GENERAT = g

    }
    let fn_guns = function(x,y,st){

        Gen_st.gun_dmg = y
        Gen_st.gun_hp = x

        if (st.pressingHere) {
            Global_updates(st)
        }

        let g = Global_generator(Gen_st)
        BUTT_1.g_HP.val = g.gun_hp
        BUTT_1.g_DM.val = g.gun_dmg
        BUTT_1.g_RE.val = g.gun_rel
        BUTT_1.FIREP.val = g.gun_hp*g.gun_dmg*g.gun_rel

        GENERAT = g

    }
    let fn_move = function(x,y,st){


        Gen_st.move_acc = y
        Gen_st.move_max = x

        if (st.pressingHere) {
            Global_updates(st)
        }

        let g = Global_generator(Gen_st)
        GENERAT = g
        BUTT_1._max.val = g.move_max
        BUTT_1._acc.val = g.move_acc
        BUTT_1._xxx.val = g.move_xxx
        BUTT_1.SPE_P.val = g.move







    }
    let fn_prec = function(x,y,st){

        Gen_st.gun_rvel = y
        Gen_st.gun_rrot = x

        if (st.pressingHere) {
            Global_updates(st)
        }
        let g = Global_generator(Gen_st)
        GENERAT = g

    }
    let fn_mate = function(x,y,st){
        Gen_st.mate_1 = y
        Gen_st.mate_2 = x

        if (st.pressingHere) {
            Global_updates(st)
        }

        let g = Global_generator(Gen_st)
        GENERAT = g
    }


    stats.vy= 1-Gen_st.gen_bod
    stats.vx= 1-Gen_st.gen_gun
    let pik_core = add_canvas_picker(popup,fn_core,stats)


    stats.x = 110
    stats.colorX = ['rgb(125, 0, 100)','rgb(4, 255, 0)']
    stats.colorY = ['rgb(0, 0, 0)','rgb(255, 0, 0)']
    stats.vy= Gen_st.body_dmg
    stats.vx= Gen_st.body_hp
    let pik_body = add_canvas_picker(popup,fn_body,stats)


    stats.y = 140
    stats.colorX = ['rgb(0, 0, 0)','rgb(0, 17, 255)']
    stats.colorY = ['rgb(113, 0, 124)','rgb(26, 255, 0)']
    stats.vy= Gen_st.gun_dmg
    stats.vx= Gen_st.gun_hp
    let pik_move = add_canvas_picker(popup,fn_move,stats)


    stats.x = 0
    stats.colorX = ['rgb(0, 0, 0)','rgb(0, 0, 255)']
    stats.colorY = ['rgb(0, 0, 0)','rgb(255, 0, 0)']
    stats.vy= Gen_st.move_acc
    stats.vx= Gen_st.move_max
    let pik_guns = add_canvas_picker(popup,fn_guns,stats)

    stats.y = 260
    stats.colorX = ['rgb(0, 0, 0)','rgb(114, 211, 162)']
    stats.colorY = ['rgb(140, 85, 145)','rgb(242, 255, 0)']
    stats.vy= Gen_st.gun_rvel
    stats.vx= Gen_st.gun_rrot
    let pik_prec = add_canvas_picker(popup,fn_prec,stats)


    stats.x = 110
    stats.colorX = ['rgb(196, 0, 230)','rgb(177, 136, 0)']
    stats.colorY = ['rgb(0, 0, 0)','rgb(145, 255, 0)']
    stats.vy= Gen_st.move_acc
    stats.vx= Gen_st.move_max
    let pik_mate = add_canvas_picker(popup,fn_mate,stats)


    pik_core.update();
    pik_body.update();
    pik_guns.update();
    pik_move.update();
    pik_prec.update();
    pik_mate.update();
}