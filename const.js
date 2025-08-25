const P2 = Math.PI*2
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


////// world settings
const COL = {
back: 'rgba(0, 0, 0, 1)',
fog: ' rgba(193, 193, 193, 1)',
fog2: ' rgba(255, 255, 255, 1)',

black: 'rgba(0, 0, 0, 1)',
light: 'rgb(255, 255, 255,1)',


bor_1: 'rgba(0, 0, 0, 1)',
bor_2: 'rgba(255, 255, 255, 1)',
bor_trasp1: 0.4,
bor_trasp2: 0.5,
gun: 'rgba(122, 122, 122, 1)',
sm_dmg: 'rgba(0, 0, 0, 1)',
sm_hp: 'rgba(255, 255, 255, 1)',
}
function SCALLING(B) {

    let HP_s =       0.25*((B.r) ** 1.5)
    let friction_s = 1-1/(1+B.r)
    let spead_s =    (1-friction_s)*12
    let mass =       0.06*((B.r) ** 1.2)
    let fov =        8/((B.r) ** 0.6)
    let regen =        B.regen

    L('22222222222222222222222222222')
    L(spead_s)
    L(friction_s)
    L(B.r)

    B.spead? B.spead = spead_s : null
    B.frict? B.frict = friction_s : null
    B.m? B.m = mass : null
    B.inv_m? B.inv_m = 1/mass : null
    B.maxhp? B.maxhp = HP_s : null
    B.regen? B.regen = regen : null
    B.fov? B.fov = fov : null
    B.bor_s? Get_bor_s(B) : null
}
function SCALE(B,size) {

    let r = size
    let HP_s =       ((size) ** 1.5)
    let mass =       ((size) ** 1.2)
    let fov =        ((size) ** 0.6)
    let regen =      1

    B.r? B.r *= r : null
    B.m? B.m *= mass : null
    B.inv_m? B.inv_m *= 1/mass : null
    B.maxhp? B.maxhp *= HP_s : null
    B.regen? B.regen *= regen : null
    B.fov? B.fov *= fov : null
    B.bor_s? Get_bor_s(B) : null
}
function Get_bor_s(a){
    a.bor_s = Math.log2(a.r + 1.2)/2
} //a.bor_s = Math.log2(a.r + 1) / 2

const MODES = ["r_1vs1","arenasize"];
const WG_x = 0
const WG_y = 0
const maxagents = 0
let COPYPASTE

const DRW_1 = [];
const DRW_2 = [];
const DRW_3 = [];

const ACT0 = [];
const ACT1 = [];
const ACT2 = [];
const ACT = [];
const ACT_ = [];

const ARCHIVED = [];
const SELECTED = [];
const DELETED = [];

//moving ball
const REPOS = [];
const COLLI_G = []; // repos
const COLLI_B = [];
const COLLI_BDMG = [];
const COL_EFFECT = [];
//alive
const KILLABLE = [];

const BU = { // build
    fov: 0.5,
    spead: 0.5,
    accel: 0.5,
    regen: 0.5,
    healt: 0.5,
    body_dmg: 0.5,
    bullet_hp: 0.5,
    bullet_dmg: 0.5,
    reload: 0.5,
    b_shoot: 0.5,
    b_range: 0.5,
    b_time: 0.5,
    precision:0.5,
    b_spe_ran: 0.5,
    b_size: 0.5,
}
const BU_ranges = {
    fov: {min:1200,max:3200,exp:0.7},

    spead: {min:3,max:8,exp:1},
    accel: {min:0.98,max:0.85,exp:0.5},

    regen: {min:0.0015,max:0.04,exp:0.3},
    healt: {min:80,max:120,exp:1.5},
    body_dmg: {min:2,max:3,exp:1.5},

    bullet_hp: {min:0.04,max:12,exp:1.8},
    bullet_dmg: {min:0.001,max:0.3,exp:1.8},       // with 1.5 is quite linear 2 5/5 tank are defeated by a 10/10 tank
    reload: {min:0.002,max:0.2,exp:0.3},

    b_shoot: {min:4,max:30,exp:1},
    b_range: {min:0.8,max:1,exp:8},
    b_time: {min:12,max:700,exp:0.3},

    precision: {min:3,max:0,exp:3},
    b_spe_ran: {min:0.2,max:1,exp:2},
    b_size: {min:0.05,max:1.4,exp:0.6},
}
function Bbuild_covertor(){
    //normalize
    let finalstats = {}
    let count = 0
for (const key in BU) { // make an object and count the value
    if (Object.prototype.hasOwnProperty.call(BU, key)) {
        count += BU[key];
        finalstats[key] = BU[key];
            
    }
}

let norm = 6/count
if(count <= 0) {norm = 0}
for (const key in finalstats) {
    if (Object.prototype.hasOwnProperty.call(finalstats, key)) {
        //finalstats[key] *= norm;  // make the sum of all resulting in 6 and the single 0,5
    }
}



for (const key in finalstats) {
        if (Object.prototype.hasOwnProperty.call(finalstats, key)) {

            let range = BU_ranges[key].max - BU_ranges[key].min

            finalstats[key] = (finalstats[key]**(1/BU_ranges[key].exp) )*range + BU_ranges[key].min;  
            
            
            // make the sum of all resulting in 6
        }
}


return finalstats
}

let camera = { x: WG_x, y: WG_y, zoom: (window.innerWidth+window.innerHeight)/1800, rotation: 0, dx: 0, dy: 0 ,fov:1800};
let mousePos = { x: 0, y: 0 ,old_x:0,old_y:0};
let mouseClient = { x: 0, y: 0 };

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }



    normalize() {
        let len = this.mag();
        return len !== 0 ? this.mult(1 / len) : new Vec(0, 0);
    }


    sub(v) {
        return new Vec(this.x - v.x, this.y - v.y);
    }
    givelengt(l) {
        let len = this.mag();
        return len !== 0 ? this.mult(l / len) : new Vec(0, 0);
    }
    _givelengt(l) {
        let len = this.mag();
        return len !== 0 ? this.mult(l / len) : new Vec(0, 0);
    }
    add(v) {
        return new Vec(this.x + v.x, this.y + v.y);
    }
    _add(v) {
        this.x += v.x; this.y += v.y
    }
    _sub(v) {
        this.x -= v.x; this.y -= v.y
    }
    mult(n) {
        return new Vec(this.x * n, this.y * n);
    }
    _mult(n) {
        this.x *= n
        this.y *= n
    }
    div(n) {
        return new Vec(this.x / n, this.y / n);
    }
    _div(n) {
        this.x /= n
        this.y /= n
    }
    normal() {
        let Ny = -this.y
        let mag = Math.sqrt(this.x ** 2 + Ny ** 2)
        if (mag === 0) {
            return new Vec(0, 0);
        } else {
            return new Vec(Ny / mag, this.x / mag);
        }
    }
    _normal() {
        let x = this.y *= -1
        let y = this.x

        let mag = Math.sqrt(x ** 2 + y ** 2)
        if (mag === 0) {
            return new Vec(0, 0);
        } else {
            this.y = y / mag
            this.x = x / mag
        }
    }
    avenge(v, w) {

        let w2 = 1 - w

        return new Vec(this.x * w2 + v.x * w, this.y * w2 + v.y * w)
    }
    _avenge(v, w) {

        let w2 = 1 - w

        this.x = this.x * w2 + v.x * w
        this.y = this.y * w2 + v.y * w
    }
    unit() {
        let mag = Math.sqrt(this.x ** 2 + this.y ** 2)
        if (mag === 0) {
            return new Vec(0, 0);
        } else {
            return new Vec(this.x / mag, this.y / mag);
        }
    }
    _unit() {
        let mag = Math.sqrt(this.x ** 2 + this.y ** 2)
        if (mag === 0) {
            this.x = 0; this.y = 0;
        } else {
            this.x /= mag; this.y /= mag
        }
    }
    rotate(rad) {
        // Apply 2D rotation matrix
        let rotatedX = this.x * Math.cos(rad) - this.y * Math.sin(rad);
        let rotatedY = this.x * Math.sin(rad) + this.y * Math.cos(rad);
        return new Vec(rotatedX, rotatedY);
    }
    _rotate(rad) {
        // Apply 2D rotation matrix
        let x = this.x
        let y = this.y
        this.x = x * Math.cos(rad) - y * Math.sin(rad);
        this.y = x * Math.sin(rad) + y * Math.cos(rad);
    }
    swap() {
        return new Vec(-this.y, this.x)
    }
    _swap() {
        let x = this.x
        this.x = -this.y
        this.y = this.x
    }
    cross(v) {
        return new Vec((this.x * v.y), - (this.y * v.x));
    }




    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static cross(v1, v) {
        return new Vec((v1.x * v.y), - (v1.y * v.x));
    }
    dist(v) {
        return Math.hypot((this.x - v.x), (this.y - v.y));
    }
    distSq(v) {
        return (this.x - v.x) ** 2 + (this.y - v.y) ** 2;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    mag() {
        return Math.hypot(this.x, this.y);
    }
    magSq() {
        return this.x ** 2 + this.y ** 2
    }

}
class RGBA {
    constructor(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.Upd();
    }
    // Update HEX representation
    updateCode_old() {
        this.c = `#${[this.r, this.g, this.b]
            .map(c => c.toString(16).padStart(2, '0'))
            .join('')}`;
    }
    Upd() {
        this.c = `rgba(${this.r},${ this.g},${ this.b},${ this.a})`;
    }
    clamp() {
        this.r = Math.min(255, Math.max(0, Math.round(this.r)));
        this.g = Math.min(255, Math.max(0, Math.round(this.g)));
        this.b = Math.min(255, Math.max(0, Math.round(this.b)));
        this.a = Math.min(1, Math.max(0, this.a));
    }
    // Multiply by scalar
    mult(value) {
        return new RGBA(
            Math.min(255, Math.max(0, Math.round(this.r * value))),
            Math.min(255, Math.max(0, Math.round(this.g * value))),
            Math.min(255, Math.max(0, Math.round(this.b * value))),
            Math.min(255, Math.max(0,this.a))
            )
    }
    _mult(value) {
        this.r *= value;
        this.g *= value;
        this.b *= value;
        this.clamp();
        this.Upd();
    }
    // Mix two colors by weight
    mix(other, weight = 0.5) {
        const w1 = 1 - weight;
        const w2 = weight;
        return new RGBA(
            this.r * w1 + other.r * w2,
            this.g * w1 + other.g * w2,
            this.b * w1 + other.b * w2,
            this.a * w1 + other.a * w2
        );
    }
    _mix(other, weight = 0.5) {
        const w1 = 1 - weight;
        const w2 = weight;
        this.r = this.r * w1 + other.r * w2;
        this.g = this.g * w1 + other.g * w2;
        this.b = this.b * w1 + other.b * w2;
        this.a = this.a * w1 + other.a * w2;
        this.Upd();
    }
    // Adjust saturation (0 to desaturate, 1 to saturate)
    msat() {
        if (this.r == this.g == this.b) return new RGBA(this.r,this.g,this.b,this.a)
        let m = Math.min(this.r,this.g,this.b)
        let M = Math.max(this.r,this.g,this.b)
        let mu = 1/((M-m)/255)
        return new RGBA((this.r-m)*mu,(this.g-m)*mu,(this.b-m)*mu,this.a)
    }
    sat(amount = -0.8) {
        if(amount>0){
            return this.mix(this.msat(),amount)
        } else {
            let gray = (this.r+this.g+this.b)/3
            return this.mix(new RGBA(gray,gray,gray,this.a),-amount)
        }
    }
    _sat(amount = -0.8) {
        if(amount>=0){
            let sat = this.msat()
            this._copy(this._mix(this.msat(),amount))
        } else {
            let gray = (this.r+this.g+this.b)/3
            this._mix(new RGBA(gray,gray,gray,this.a),-amount)
        }
    }
    // Adjust brightness
    hue(hue_r) {
        const minVal = Math.min(this.r, this.g, this.b);
        let r = this.r-minVal;
        let g = this.g-minVal;
        let b = this.b-minVal; //"separate grays from hue"

        const max = Math.max(r, g, b)
        if (max == 0) return new RGBA(this.r, this.g, this.b, this.a);

        const prop = (r + g + b -max)/max //0 on red  1 on magenta
        const order = (r == max>b || b == max>g || g == max>r)? 1:-1

        hue_r +=prop/6*order
        if(hue_r<0){hue_r=Math.trunc(-hue_r+1)+hue_r}
        while(hue_r > 1/3){
            hue_r-=1/3;
            [r, g, b] = [g, b, r]
        }
        //trasform to pure r
        r = r==max? r : 0
        g = g==max? g : 0
        b = b==max? b : 0

        let m0 = Math.min((2-hue_r*6),1) //calculating multipers in a space of 0,1/3  where  0,1/6 is 1,1 and 1/6,1/3 is 1,0
        let m1 = Math.min((hue_r*6),1) //this is in a space of 0,1/6 =  0,1 and 1/6,1/3 1,1

        return new RGBA(
            r* m0 + g * m1+minVal,
            g* m0 + b * m1+minVal,
            b* m0 + r * m1+minVal,
            this.a
        );
    }
    lig(lig){
        let gray = (this.r+this.g+this.b)/3

        if(lig>0){
            gray=(255-gray)*lig
        } else {
            gray*=lig
        }

        let ne = new RGBA(this.r + gray,this.g + gray,this.b + gray,this.a)
        ne.clamp()
        return ne
    }
    _lig(lig){
        let add = 255*lig
        this.r += add
        this.g += add
        this.b += add
        this.clamp()
        this.Upd()
    }
    edit(r, g, b, a){
    let nr = r?? this.r
    let ng = g?? this.g
    let nb = b?? this.b
    let na = a?? this.a
    return new RGBA(nr, ng, nb, na)
    }
    _copy(c){
        if(!c)return
        this.r = c.r?? this.r
        this.g = c.g?? this.g
        this.b = c.b?? this.b
        this.a = c.a?? this.a
        this.c = c.c?? this.c
        }
    clone(){
        return new RGBA(
            this.r,
            this.g,
            this.b,
            this.a  
        )
        }
    full_trasf(hue=0,sat=0,lig=0,aph=0){
        let ggb = this.hue(hue/2)
        ggb._sat(sat)
        ggb._lig(lig)
        ggb._amix(aph)
        ggb.Upd()
        return ggb
        // 0 = no change, 1 = max, -1 = min
    }
    _amix(mult){
        if(0<mult){
         this.a = -((mult+1)*(mult-1)*this.a)
        } else {
          this.a = -((mult+1)*(mult-1)*this.a)+mult**2
        }
    }
}
class Build_tank {
    constructor() {
        this.fov = 1;

        this.spead = 1;
        this.acceleration = 1;

        this.regen = 1;
        this.hp = 1;
        this.body_dmg = 1;

        this.regen = 1;
        this.hp = 1;
        this.body_dmg = 1;


        this.Upd();
    }
}


function Start_Duel(){
        let oldc = BUTT_1.color.val2
        let olbdc = BUTT_1.bor_col.val2

        let pos = new Vec(WG_x,WG_y)
        pos.x +=500
        pos._rotate(Math.random())

        BUTT_1.color.val2 = new RGBA(244, 155, 5)
        BUTT_1.bor_col.val2 = new RGBA(50, 0, 0, 1)
        let c = GEN_NPC(pos.x, pos.y)
        c.team = 435345532

        pos._rotate(Math.PI)

        BUTT_1.color.val2 = new RGBA(44, 155, 255)
        BUTT_1.bor_col.val2 = new RGBA(0, 0, 60, 1)
        let c2 = GEN_NPC(pos.x, pos.y)
        c2.team = 4243968


        let Build = Bbuild_covertor()
        camera.zoom = (canvas.width+canvas.height)/Build.fov;
        camera.fov = Build.fov;
        THE_PLAYER = Math.random()<0.5? c2 : c


        for (let i = 0; i < THE_PLAYER.child.length; i++) {
        const e = THE_PLAYER.child[i];
        if (e.target) e.DIE() // kill the ai
        }


        BUTT_1.color.val2 = oldc
        BUTT_1.bor_col.val2 = olbdc

        return [c,c2]
}

var THE_PLAYER = {}