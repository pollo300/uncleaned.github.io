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

const WG_x = 32768
const WG_y = 32768
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