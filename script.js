
function SEE_(x, y, c) {
    SEE_X.push({ x: x, y: y, c: c })
}
function SEE_V(v, c) {

    SEE_X.push({ x: v.x, y: v.y, c: c })
}
function SEE_L(v, v2, c = 'red') {
    SEE_Lv.push({ a: v, b: v2, c: c })
}
function SEE_T(v, t, c = '#fff') {
    SEE_Tv.push({ a: v, b: t, c: c })
}
var SEE_X = [];
var SEE_Lv = [];
var SEE_Tv = [];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hp
// Dmg
// Precision
// speed````````````````````````````````
// Firction
// 
// Size_variation
//
// lifetime
//
// count
//
// reload
///////////////////////////////////////////////
// RANKS:
// 
//  -1:??
//  0: world object
//  1: player/npc:enemys
//  2: minions
//  3: drones
//  4: bullets
//  5+: minions bullet / bullet bullets, drone effecst and other things


function DIE_0() {
    DELETED.push(this)
}

function DIE_01() {
    if (!this.died_time) {
        this.died_time = 0;
        this.died_time++
        if (this.died_time < 10) return
        DELETED.push(this)
    }
}


function DIE_1() {
    DELETED.push(this)
    this.child.forEach((c) => c.DIE())
}
function DIE_2() {
    if (!this.died_time) {
        this.died_time = 0;
        let arrays = [COLLI_BDMG, ACT];
        for (let i = 0; i < arrays.length; i++) {
            const arr = arrays[i];
            let index = arr.indexOf(this);
            if (index > -1) {
                arr.splice(index, 1); // Remove the object if found
            }
        }
    }
    this.died_time++
    this.r *= 1.1
    this.DIE_anim()
    if (this.died_time < 10) return
    DELETED.push(this)
}
function DIE_3() {
    if (!this.died_time) {
        this.died_time = 0;
        let arrays = [COLLI_BDMG, ACT];
        for (let i = 0; i < arrays.length; i++) {
            const arr = arrays[i];
            let index = arr.indexOf(this);
            if (index > -1) {
                arr.splice(index, 1); // Remove the object if found
            }
        }
    }
    this.child.forEach((c) => c.DIE())
    this.died_time++
    this.r *= 1.1
    this.DIE_anim()
    if (this.died_time < 10) return
    DELETED.push(this)
}
function DIE_anim0() {
    this.color = rgba_mult(this.color, 1, 1, 1, 0.7)
    this.bor_col = rgba_mult(this.bor_col, 1, 1, 1, 0.8)
}


///////////////////
function DIE_anim01() {
    this.color.a *= 0.7
    this.bor_col.a *= 0.8
    this.color.Upd()
    this.bor_col.Upd()
}
function drawB01(b) {
    ctx.beginPath();
    ctx.arc(b.pos.x, b.pos.y, b.r, 0, 2 * Math.PI);
    ctx.fillStyle = b.color.c;
    ctx.strokeStyle = b.bor_col.c;
    ctx.lineWidth = b.bor_s
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function drawBl01(b) {

    if (!b.died_time) {
        let ratio = 0.5 * (b.maxage - b.age) / b.maxage + 0.5 - 0.5 * ((b.maxhp - b.hp) / b.maxhp)

        let ratio2 = Math.min(b.r / b.pos.dist(b.pos_o), 1)

        b.color.a = ratio * ratio2
        b.bor_col.a = ratio
        b.color.Upd()
        b.bor_col.Upd()
    }

    ctx.lineCap = 'round'
    ctx.beginPath();
    ctx.lineWidth = b.r * 2
    ctx.strokeStyle = b.color.c
    ctx.lineTo(b.pos.x, b.pos.y)
    ctx.lineTo(b.pos_o.x, b.pos_o.y)
    ctx.stroke();
    ctx.closePath();
    ctx.lineCap = 'butt'

    ctx.beginPath();
    ctx.arc(b.pos.x, b.pos.y, b.r, 0, P2);
    ctx.strokeStyle = b.bor_col.c
    ctx.lineWidth = b.bor_s
    ctx.stroke();
    ctx.closePath();

}







function D_anim(k) {
    k.color = rgba_mult(k.color, 1, 1, 1, 0.7)
    k.bor_col = rgba_mult(k.bor_col, 1, 1, 1, 0.8)

    if (k.child) for (let i = 0; i < k.child.length; i++) {
        D_anim(k.child[i]);
    }
}
class Action_0 {
    constructor(x, y, action = function (o) { }, r = 25) {
        this.pos = new Vec(x, y);
        this.vel = new Vec(0, 0);
        this.r = r / camera.zoom;
        this.id
        this.owner
        this.type
        this.c_act = action
        ACT.push(this);
        DRW_3.push(this);
        DELETED.push(this);
        this.arrays = [ACT, DRW_3]
    }
    act() {
        const cands0 = rtr0dmg.search(voidMBR(this));
        cands0.forEach(cand => {
            if (cand.object !== this) {
                if (coll_det_bb(this, cand.object)) {
                    this.c_act(cand.object)
                }
            }
        });

        let r = this.r
        let pos = this.pos
        let f = function (XX) {
            if ((XX.r + r) ** 2 < XX.pos.distSq(pos)) return false
            return true
        }

        let finded = Force_find(COLLI_B, f)
        finded.forEach((f) => { this.c_act(f) })

    }
    drw_3() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.strokeStyle = getRandomColor() + 22;
        ctx.lineWidth = 7 / camera.zoom;
        ctx.stroke();
        ctx.fillStyle = getRandomColor() + 22;
        ctx.fill();
        ctx.closePath();
    }
}
function Force_find(ARRAY = COLLI_BDMG, Condiction_fun = function (x) { if (x = this) return false }) {
    RETU = [];
    ARRAY.forEach((obj) => {
        if (Condiction_fun(obj)) {
            RETU.push(obj)
        }
    });
    return RETU
}


class Action_del {
    constructor(x, y) {
        this.pos = new Vec(x, y);
        this.vel = new Vec(0, 0);
        this.r = 4;
        this.id
        this.owner
        this.type
        ACT.push(this);
        DRW_2.push(this);
        DELETED.push(this);
        this.arrays = [ACT, DRW_2]
    }
    act() {
        const cands = rtr0dmg.search(voidMBR(this));
        cands.forEach(cand => {
            if (cand.object !== this) {
                if (coll_det_bb(this, cand.object)) {
                    DELETED.push(cand.object)
                }
            }
        });
    }
    drw_2() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.strokeStyle = getRandomColor() + 22;
        ctx.lineWidth = 7 / camera.zoom;
        ctx.stroke();
        ctx.fillStyle = getRandomColor() + 22;
        ctx.fill();
        ctx.closePath();
    }
}









class Ball {
    constructor() {
        this.pos = new Vec(0, 0);
        this.pos_o = new Vec(0, 0);
        this.vel = new Vec(0, 0);
        this.owner;
        this.child = [];
    }
}


/// global usage functio
function RECURSIV(k, F) {
    "F(k)"
    if (k.child) for (let i = 0; i < k.child.length; i++) {
        RECURSIV(k.child[i], F);
    }
}
function deepClone(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }





    if (Array.isArray(obj)) {
        const arrCopy = [];
        for (let i = 0; i < obj.length; i++) {
            let clonedepth = deepClone(obj[i])
            arrCopy[i] = (clonedepth)
        }
        return arrCopy;
    }






    let owner = false
    let arrays = []
    const copy = Object.create(Object.getPrototypeOf(obj)); // Preserve the prototype
    for (let i = 0; i < Object.keys(obj).length; i++) {
        const key = Object.keys(obj)[i]

        let Continue = true

        if (key == 'owner') { Continue = false; owner = obj[key]; copy[key] = obj[key] }
        if (key == 'arrays') { Continue = false; arrays = obj[key]; copy[key] = obj[key] }
        if (Continue) { copy[key] = deepClone(obj[key]) }
    }




    if (!copy.arrays) return copy
    copy.arrays = [];
    let index = arrays.indexOf(owner.child)
    for (let i = 0; i < arrays.length; i++) {
        if (i != index) { copy.arrays.push(arrays[i]) }
    }
    if (copy.child) {
        for (let i = 0; i < copy.child.length; i++) {
            copy.child[i].owner = copy
            copy.child[i].arrays.push(copy.child)
        }
    }
    //copy.arrays.forEach((arr) => arr.push(copy));
    return copy;
}
function Deep_push(obj) {

    obj.arrays.forEach((arr) => {
        if (obj.owner &&
            obj.owner.child != arr
        ) { arr.push(obj) } else {
            //obj.child.push(obj)
        }
    });

    if (!obj.child) return obj

    for (let i = 0; i < obj.child.length; i++) {
        Deep_push(obj.child[i])
    }
    return obj
}



DRW_1.KeepOrder_ = true
DRW_2.KeepOrder_ = true
DRW_3.KeepOrder_ = true
function DELETE(obj) {
    if (obj.child) for (let i = obj.child.length - 1; i > -1; i--) {
        DELETE(obj.child[i])
    }
    if (obj.arrays) for (let i = obj.arrays.length - 1; i >= 0; i--) {
        const arr = obj.arrays[i];
        let index = arr.indexOf(obj);
        if (index > -1) {
            if (arr.KeepOrder_) {
                arr.splice(index, 1); // Remove the object if found
            } else {
                arr[index] = arr[arr.length - 1]
                arr.length--
            }
        }
    }

    //obj.vel = null
    //obj.pos = null
    //obj.owner = null
    //obj.child = [];
    //obj = null
    delete window.obj
}
function ARCHIVE(obj, owner = { child: undefined }) {
    if (obj.child) for (let i = obj.child.length - 1; i > -1; i--) {
        ARCHIVE(obj.child[i], obj)
    }
    if (obj.arrays) for (let i = obj.arrays.length - 1; i > -1; i--) {
        const arr = obj.arrays[i];

        let index = -1

        if (arr !== owner.child) {
            index = arr.indexOf(obj);
        }

        if (index > -1) {
            arr.splice(index, 1); // Remove the object if found
        }
    }
}
function Array_push(obj) {
    if (obj.arrays) for (let i = 0; i < obj.arrays.length; i++) {
        const arr = obj.arrays[i];
        arr.push(obj);
    }
}


//////////////////////////////////////////////////// Custom obj




///agent function
function evaluate(ag) {
    let dx = WG_x - ag.pos.x;
    let dy = WG_y - ag.pos.y;
    let distance = (Math.abs(dy) + Math.abs(dx)) + 100

    if (distance > 2600) { ag.fit -= 1 * distance / 2000 }

    ag.fit = ag.fit * 0.99 + 3.4 + 10 / (distance) + ag.hp / 300
}
function Cu_sig(x) {
    return Math.sign(x) * (1 / (1 + Math.abs(x))) * 2;
}
//// Mishellandus
function round(number, precision) {
    let factor = 10 ** precision;
    return Math.round(number * factor) / factor;
}
function R_in(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function gaussianRandom(mean = 0, stddev = 1) {
    let u = Math.random();
    let v = Math.random();
    return mean + Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * stddev;
}
function Get_rotation(x, y, obj) {
    let crot = new Vec(x - obj.pos.x, y - obj.pos.y);
    let rotation = Math.atan2(crot.y, crot.x);
    return rotation
}
function Centernumber(A, c = 1) {
    A *= -1
    if (A >= 0) A += c
    return A
}
function alternateSequence(num) {
    return num % 2 === 0 ? -num / 2 : num / 2 - 0.5; // Alternate between positive and negative
}




let ID_s = { s: Math.random() * 5541, c: 1 }
//ID_s.s = 2038.866517279806
console.log(ID_s)
console.log(ID_s.s)
function S_ran(max = 1, s = ID_s, count = 16.1803398875) {
    s.c += count
    if (s.c > 999999) { s.c -= 999998.5834751 }
    let n = s.s * s.c ** 2 % max
    return n;
}
function Scale_n(n, min, max, tr) {

    if (tr) return Math.floor((n * (max - min + 1) + min) * tr) / tr
    return n * (max - min) + min
}
function Det_gaussR(mean = 0, stddev = 1) {
    let u = S_ran(1 - 0.00001) + 0.00001;
    let v = S_ran(1 - 0.00001) + 0.00001;
    return mean + Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * stddev;
}






//draw
function drawBall(b) {
    ctx.beginPath();
    ctx.arc(b.pos.x, b.pos.y, b.r, 0, 2 * Math.PI);
    ctx.fillStyle = b.color;
    ctx.strokeStyle = b.bor_col;
    ctx.lineWidth = b.bor_s
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function drawBlt(b) {


    let ratio = (1 - ((b.maxhp - b.hp) / b.maxhp) + ((b.maxage - b.age) / b.maxage))
    b.r / (b.pos_o.dist(b.pos));



    let ratio2 = Math.min(b.r / b.pos.dist(b.pos_o), 1)
    ctx.lineCap = 'round'
    ctx.beginPath();
    ctx.lineWidth = b.r * 2
    ctx.strokeStyle = rgba_mult(b.color, 1, 1, 1, ratio * ratio2);
    ctx.lineTo(b.pos.x, b.pos.y)
    ctx.lineTo(b.pos_o.x, b.pos_o.y)
    ctx.stroke();
    ctx.closePath();
    ctx.lineCap = 'butt'

    ctx.beginPath();
    ctx.arc(b.pos.x, b.pos.y, b.r, 0, P2);
    ctx.strokeStyle = rgba_mult(b.bor_col, 1, 1, 1, ratio);
    ctx.lineWidth = b.bor_s
    ctx.stroke();
    ctx.closePath();

}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getRandomRGBA(a, b) {
    let A = Math.random()

    if (a && b) {
        A = A * (b - a) + a
    }

    return "rgb(" + R_in(0, 255) + "," + R_in(0, 255) + "," + R_in(0, 255) + "," + A + ")";
}
function rgba(r, g, b, a) {
    return "rgb(" + r + "," + g + "," + b + "," + a + ")";
}
function drawStar(cx, cy, spikes, outerRadius, innerRadius, c, c_b) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.fillStyle = c;
    ctx.fill();
    ctx.strokeStyle = c_b;
    ctx.stroke();
}
function rgba_mult(rgbColor, rM, gM, bM, aM) {
    // Extract the RGBA values from the input string
    let rgba = rgbColor.match(/\d+(\.\d+)?/g); // Matches integers and decimals

    // Parse RGB values and apply multipliers
    let r = Math.min(255, Math.max(0, Math.round(rgba[0] * rM)));
    let g = Math.min(255, Math.max(0, Math.round(rgba[1] * gM)));
    let b = Math.min(255, Math.max(0, Math.round(rgba[2] * bM)));
    //let a = rgba[3] !== undefined ? parseFloat(rgba[3]) : 1;

    let a
    if (rgba.length < 3) { a = 1 }
    else { a = Math.min(1, (rgba[3] * aM).toFixed(4)) }


    return `rgb(${r}, ${g}, ${b}, ${a})`;
}
function rgba_mix(rgbColor, rgbColor2, M = 0.5) {
    // Extract the RGBA values from the input string
    let rgba = rgbColor.match(/\d+(\.\d+)?/g); // Matches integers and decimals
    if (rgba.length < 3) return rgbColor; // Ensure valid RGB(A) input

    let rgba2 = rgbColor2.match(/\d+(\.\d+)?/g); // Matches integers and decimals
    if (rgba2.length < 3) return rgbColor2; // Ensure valid RGB(A) input

    let N = 1 - M

    let r = (rgba[0] * M + rgba2[0] * N);
    let g = (rgba[1] * M + rgba2[1] * N);
    let b = (rgba[2] * M + rgba2[2] * N);
    if (rgba[3] == undefined) rgba[3] = 1;
    if (rgba[3] == undefined) rgba2[3] = 1;
    let a = (rgba[3] * M + rgba2[3] * N);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function rgba_max_sat(rgbColor) {
    // Extract the RGBA values from the input string

    let rgba = rgbColor.match(/\d+(\.\d+)?/g); // Matches integers and decimals
    let r = rgba[0]
    let g = rgba[1]
    let b = rgba[2]
    let a = rgba[3] ?? 1

    let min = Math.min(r, g, b)
    r -= min
    g -= min
    b -= min

    let max = (Math.max(r, g, b))
    if (max == 0) return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${a})`
    let invm = 1 / max

    r *= invm * 255
    g *= invm * 255
    b *= invm * 255

    //          rgba_maxsaturation('rgba(4,1,1,0)')
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// currently used pysyc
function coll_det_bb(b1, b2) {
    if (Math.pow(b1.r + b2.r, 2) > Math.pow(b2.pos.x - b1.pos.x, 2) + Math.pow(b2.pos.y - b1.pos.y, 2)) {
        return true;
    } else {
        return false;
    }
}
function Complete_collision(b1, b2) {

    // **Step 1: Collision Detection**
    let radiusSum = b1.r + b2.r;
    let trajectory = b1.vel.sub(b2.vel);
    let centerDist = b2.pos.sub(b1.pos);
    let normal = centerDist.unit();
    let approachSpeed = Vec.dot(trajectory, normal);

    // if they are too far to collide return
    if ((radiusSum + approachSpeed) ** 2 < (centerDist.x) ** 2 + (centerDist.y) ** 2) return

    // Quadratic equation coefficients for time of impact (TOI)
    let a = trajectory.magSq();
    let b = 2 * Vec.dot(centerDist, trajectory);
    let c = centerDist.magSq() - radiusSum * radiusSum;
    let Delt = - 4 * a * c
    let discriminant = b * b + Delt;
    if (discriminant < 0) return; // stop the function if ball trajectory don't intersect



    // **Step 2: Penetration Resolution**
    let massnorm = 1 / (b1.inv_m + b2.inv_m)
    let weit1 = 1 * massnorm * b1.inv_m
    let weit2 = 1 - weit1
    let pen_depth = radiusSum - centerDist.mag();
    let pen_res = normal.mult(pen_depth * Math.sign(Delt));
    let slidness = b2.slide + b1.slide


    b1.pos = b1.pos.add(pen_res.mult(-weit1));
    b2.pos = b2.pos.add(pen_res.mult(weit2));


    b1.vel = b1.vel.add(pen_res.mult(-weit1 * slidness));
    b2.vel = b2.vel.add(pen_res.mult(weit2 * slidness));


    let v_mult = approachSpeed * b1.elast * b2.elast
    let impulseVec1 = normal.mult(v_mult * -weit1)
    let impulseVec2 = normal.mult(v_mult * weit2)
    b1.vel = b1.vel.add(impulseVec1);
    b2.vel = b2.vel.add(impulseVec2);

    //MEDIATION
    let stikn = Math.max(b1.stk, b1.stk)
    let aveng1 = (b1.vel.avenge(b2.vel, weit1 * stikn))
    let aveng2 = (b2.vel.avenge(b1.vel, weit2 * stikn))
    b1.vel = aveng1;
    b2.vel = aveng2;
}
function Complete_collision_DMG(b1, b2) {
    //SEE_T(b1.pos,'0')
    let dmg = false
    let ignore = 0
    let bounce = 0
    if (b1.team !== b2.team) {
        dmg = true
        ignore = 0
    } else {
        if (b1.rank == b2.rank) {
            ignore = b1.relat.ing + b1.relat.ing
        }
        if (b1.rank > b2.rank) {
            ignore = b1.relat.ing_0 + b2.relat.ing_1
        }
        if (b1.rank < b2.rank) {
            ignore = b1.relat.ing_1 + b2.relat.ing_0
        }
    }


    if (ignore > 0) return
    //SEE_T({x:b1.pos.x,y:b1.pos.y+30},'1')// **Step 1: Collision Detection**
    let radiusSum = b1.r + b2.r;
    let trajectory = b1.vel.sub(b2.vel);
    let centerDist = b2.pos.sub(b1.pos);
    let normal = centerDist.unit();
    let approachSpeed = Vec.dot(trajectory, normal);
    // if they are too far to collide return
    let t_mag = trajectory.mag()     //let a = //trajectory.magSq();

    if ((radiusSum + t_mag) ** 2 < (centerDist.x) ** 2 + (centerDist.y) ** 2) return
    // SEE_T({x:b1.pos.x,y:b1.pos.y+60},'2')// Quadratic equation coefficients for time of impact (TOI)

    let a = t_mag ** 2
    let b = 2 * Vec.dot(centerDist, trajectory);
    let c = centerDist.magSq() - radiusSum * radiusSum;
    let Delt = - 4 * a * c
    let discriminant = b * b + Delt;

    if (discriminant < 0) return; // stop the function if ball trajectory don't intersect
    //if(Delt>0) significa che le palle vanno nella stessa direzione 

    // SEE_T({x:b1.pos.x,y:b1.pos.y+90},'3')//**Step 2: Penetration Resolution**
    let weit1 = (1 / (b1.inv_m + b2.inv_m)) * b1.inv_m
    let weit2 = 1 - weit1

    let pen_depth = radiusSum - centerDist.mag();
    let pen_res = normal.mult(pen_depth * Math.sign(Delt));

    let hardness = Math.min(b2.hard, b1.hard)
    b1.pos._add(pen_res.mult(-weit1 * hardness));
    b2.pos._add(pen_res.mult(weit2 * hardness));


    let slidness = b2.slide + b1.slide
    b1.vel._add(pen_res.mult(-weit1 * slidness));
    b2.vel._add(pen_res.mult(weit2 * slidness));

    // **Step 3: Collision Resolution**
    if (dmg) {  // are onject enemy? do they damnge?

        const dmg_multipler = Math.max(approachSpeed, pen_depth / radiusSum, 0)
        let n1 = b1.hp - b2.dmg * dmg_multipler
        let n2 = b2.hp - b1.dmg * dmg_multipler

        let mult = b1.dmg / b2.dmg
        let t1 = n1 * mult
        let t2 = n2 / mult

        if (t2 < 0) n1 -= t2
        if (t1 < 0) n2 -= t1

        b1.hp = n1
        b2.hp = n2

        let or = n1 > n2 ? [b2, b1] : [b1, b2]

        if (false) {

            if (b1.score == undefined) b1.score = 1
            if (b2.score == undefined) b2.score = 1
            if (or[0].hp < 0) {
                or[1].score += or[0].score
                or[0].score = 0
            }
            SEE_T(or[1].pos, or[1].score)
            SEE_T(or[0].pos, or[0].score) // score?




            const dmg_multipler = Math.max(approachSpeed, pen_depth / radiusSum, 0)
            let n1 = b1.hp * b1.dmg - b2.dmg * dmg_multipler
            let n2 = b2.hp * b2.dmg - b1.dmg * dmg_multipler

            let t2 = n2
            if (n1 < 0) n2 -= n1
            if (n2 < 0) n1 -= t2

            b1.hp = n1 / b1.dmg
            b2.hp = n2 / b2.dmg
        }
    }
    if (b1.rank == b2.rank) {
        bounce = b1.relat.bou + b1.relat.bou
    } else if (b1.rank > b2.rank) {
        bounce = b1.relat.bou_0 + b2.relat.bou_1
    } else {
        bounce = b1.relat.bou_1 + b2.relat.bou_0
    }
    if (bounce <= 0) { return }//return; // object relation is : only penetration
    //return

    let conserv = b1.elast * b2.elast
    let v_mult = approachSpeed * (b1.elast + b2.elast)
    let impulseVec1 = normal.mult(v_mult * -weit1)
    let impulseVec2 = normal.mult(v_mult * weit2)

    //b1.vel._add(impulseVec1);
    //b2.vel._add(impulseVec2);


    //b1.vel = impulseVec1
    //b2.vel = impulseVec2

    b1.vel._add(impulseVec1);
    b2.vel._add(impulseVec2);
    //let new_dir = b1.vel.mult(weit2).add(b2.vel.mult(weit1))

    // return
    let stikn = Math.max(b1.stk, b1.stk)
    let istik = (1 - stikn)
    let totalX = b1.vel.x * weit1 + b2.vel.x * weit2
    let totalY = b1.vel.y * weit1 + b2.vel.y * weit2
    b1.vel.x = totalX * stikn + istik * b1.vel.x
    b1.vel.y = totalY * stikn + istik * b1.vel.y
    b2.vel.x = totalX * stikn + istik * b2.vel.x
    b2.vel.y = totalY * stikn + istik * b2.vel.y
}

////////////////77 use old pos instead of future pos in collision calculations 





// collision and team handling
function IsActive(target) {
    return target.vel.x > 0.0001 || target.vel.y > 0.0001



    //(Math.abs(target.old_x - target.pos.x)>=0.0001 ||
    // Math.abs(target.old_y - target.pos.y)>=0.0001)


    // Threshold for movement
}
function canCollide(objA, objB) {
}
function selfC(objA) {
    // Check if objA's colliders include objB's collisiongroup and not vice versa
    return objA.colliders.includes(objA.collisiongroup)
}

//const rtr0dmg = rbush(); // import Ttree
function getMBR(b) {
    return {
        minX: Math.min(b.pos.x, b.pos.x + b.vel.x) - b.r,  // modificato

        maxX: Math.max(b.pos.x, b.pos.x + b.vel.x) + b.r,

        minY: Math.min(b.pos.y, b.pos.y + b.vel.y) - b.r, // modificato

        maxY: Math.max(b.pos.y, b.pos.y + b.vel.y) + b.r,
        object: b
    };
}
function voidMBR(b) {
    return {
        minX: Math.min(b.pos.x, b.pos.x + b.vel.x) - b.r,  // modificato

        maxX: Math.max(b.pos.x, b.pos.x + b.vel.x) + b.r,

        minY: Math.min(b.pos.y, b.pos.y + b.vel.y) - b.r, // modificato

        maxY: Math.max(b.pos.y, b.pos.y + b.vel.y) + b.r,
    };
}
function nullMBR(pos, r = 1) {
    return {
        minX: pos.x - r,  // modificato

        maxX: pos.x + r,

        minY: pos.y - r, // modificato

        maxY: pos.y + r,
    };
}

//world gen function
class Wall {
    constructor(x = 0, y = 0, rx = 50, ry = rx) {
        this.x = x;
        this.y = y;
        this.pos = new Vec(x, y)
        this.rx = rx;
        this.ry = ry;
        this.sx = rx * 2;
        this.sy = ry * 2;
        this.box = {
            minX: x - rx,
            maxX: x + rx,
            minY: y - ry,
            maxY: y + ry,
        };
        this.color = WALL_COLOR
        this.bor_color = rgba_mix(this.color, rgba(0, 0, 0, 1), 0.6)
        Get_bor_s(this)
        this.arrays = [DRW_2, ACT, ACT];
        this.Nuber = 0
        this.child = [];
        Array_push(this);
    }
    drw_2() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.bor_color;
        ctx.lineWidth = this.bor_s
        ctx.rect(this.box.minX, this.box.minY, this.sx, this.sy);
        ctx.fill();
        ctx.stroke()
        ctx.closePath();
    }
    resolve_old(b) {
        //if (b !== THE_PLAYER) return

        // Step 1: Find the closest point on the rectangle to the circle's center
        const closestX = Math.max(this.box.minX, Math.min(b.pos.x, this.box.maxX));
        const closestY = Math.max(this.box.minY, Math.min(b.pos.y, this.box.maxY));

        // Step 2: Calculate the distance between the circle's center and this closest point

        const distanceX = b.pos.x - closestX;
        const distanceY = b.pos.y - closestY;

        const distanceSquared = distanceX ** 2 + distanceY ** 2;

        // Step 3: Determine if the distance is less than or equal to the circle's radius squared
        if (b.r * b.r < distanceSquared) return; // No collision if outside the radius

        let ratio = this.sy / this.sx
        let dist_x = b.pos.x - this.x
        let dist_y = b.pos.y - this.y
        let Sign = (dist_x * ratio >= -dist_y / ratio) ? 1 : -1;
        let Sign2 = (dist_x * ratio >= dist_y / ratio) ? 1 : -1;
        let fromY = Sign * Sign2 < 0

        const pen_X = (this.x - b.pos.x) + (this.rx + b.r) * Sign
        const pen_Y = (this.y - b.pos.y) + (this.ry + b.r) * Sign

        let cornerx = (Math.abs(this.x - b.pos.x) > this.rx)
        let cornery = (Math.abs(this.y - b.pos.y) > this.ry)
        let corners = cornerx && cornery

        const distance = Math.sqrt(distanceSquared)
        let normalX = distanceX / distance;
        let normalY = distanceY / distance;
        if (!isFinite(normalX)) normalX = 0
        if (!isFinite(normalY)) normalY = 0

        if (!cornery || !cornerx) {
            if (!cornery && !fromY) b.pos.x += pen_X; else if (!cornerx && fromY) b.pos.y += pen_Y
            if (!cornery && !fromY) b.vel.x -= b.elast * b.vel.x; else if (cornery && fromY) b.vel.y -= b.elast * b.vel.x
        }
        if (cornery || cornerx) {
            let closer = new Vec((

                closestX
            )
                ,
                closestY
            )

            let dist = closer.sub(b.pos)
            SEE_(closer.x, closer.y)
            let pen_depth = b.r - (dist.mag())
            let normal = new Vec(normalX, normalY)
            b.pos = b.pos.add(normal.mult(pen_depth));
            b.vel = b.vel.add(normal.mult(b.elast * (b.vel.mag())));
            return

        }
    }
    resolve_NO(b) {
        // Step 1: Find the closest point on the rectangle to the circle's center
        const closestX = Math.max(this.box.minX, Math.min(b.pos.x, this.box.maxX));
        const closestY = Math.max(this.box.minY, Math.min(b.pos.y, this.box.maxY));

        // Step 2: Calculate the distance between the circle's center and this closest point
        const distanceX = b.pos.x - closestX;
        const distanceY = b.pos.y - closestY;
        const distanceSquared = distanceX * distanceX + distanceY * distanceY;

        // Step 3: Check for collision (distance less than radius)
        if (distanceSquared > b.r * b.r) return; // No collision if outside the radius

        // Step 4: Calculate actual distance and normalize collision normal
        const distance = Math.sqrt(distanceSquared);
        const penetrationDepth = b.r - distance;
        let normalX = distanceX / distance;
        let normalY = distanceY / distance;
        if (!isFinite(normalX)) normalX = 0
        if (!isFinite(normalY)) normalY = 0

        // Step 5: Reposition the ball based on the penetration depth
        // Ensure we're only moving along the axis with the smallest penetration to avoid tunneling issues
        const absPenX = Math.abs(distanceX) - this.rx;
        const absPenY = Math.abs(distanceY) - this.ry;

        if (absPenX > absPenY) {
            // More penetration on the Y axis (top/bottom)
            b.pos.y += normalY * penetrationDepth;
            //b.vel.y = -b.vel.y * b.elasticity; // Reverse Y velocity with elasticity
            //b.vel.x *= (1 - b.frict);       // Reduce X velocity to simulate frict on the wall
        } else {
            // More penetration on the X axis (left/right)
            b.pos.x += normalX * penetrationDepth;
            b.vel.x = -b.vel.x * b.elasticity; // Reverse X velocity with elasticity
            b.vel.y *= (1 - b.frict);       // Reduce Y velocity to simulate frict on the wall
        }

        // Step 6: Handle corner cases when both axes are within bounds
        if (Math.abs(absPenX) < this.rx && Math.abs(absPenY) < this.ry) {
            const cornerPenetration = penetrationDepth;
            //b.pos.x += normalX * cornerPenetration;
            //b.pos.y += normalY * cornerPenetration;
        }
    }
    resolve_ew(b) {
        // Check edges first using your main resolve code

        // Check each corner (you'll need to handle all four)
        this.resolveCornerCollision(b, this.box.minX, this.box.minY); // Bottom-left corner
        this.resolveCornerCollision(b, this.box.maxX, this.box.minY); // Bottom-right corner
        this.resolveCornerCollision(b, this.box.minX, this.box.maxY); // Top-left corner
        this.resolveCornerCollision(b, this.box.maxX, this.box.maxY); // Top-right corner
    }
    resolve_1(b) {
        //if (b !== THE_PLAYER) return

        // Step 1: Find the closest point on the rectangle to the circle's center
        const closestX = Math.max(this.box.minX, Math.min(b.pos.x, this.box.maxX));
        const closestY = Math.max(this.box.minY, Math.min(b.pos.y, this.box.maxY));

        // Step 2: Calculate the distance between the circle's center and this closest point

        const distanceX = b.pos.x - closestX;
        const distanceY = b.pos.y - closestY;

        const distanceSquared = distanceX ** 2 + distanceY ** 2;

        // Step 3: Determine if the distance is less than or equal to the circle's radius squared
        if (b.r * b.r < distanceSquared) return; // No collision if outside the radius


        let dist_x = b.pos.x - this.x
        let dist_y = b.pos.y - this.y
        let ratio = this.sy / this.sx
        let Sign = (dist_x * ratio >= -dist_y / ratio) ? 1 : -1;
        let Sign2 = (dist_x * ratio >= dist_y / ratio) ? 1 : -1;
        let fromY = Sign * Sign2 < 0

        const pen_X = (this.x - b.pos.x) + (this.rx + b.r) * Sign
        const pen_Y = (this.y - b.pos.y) + (this.ry + b.r) * Sign

        let cornerx = (Math.abs(this.x - b.pos.x) > this.rx)
        let cornery = (Math.abs(this.y - b.pos.y) > this.ry)

        const distance = Math.sqrt(distanceSquared)
        let normalX = distanceX / distance;
        let normalY = distanceY / distance;
        if (!isFinite(normalX)) normalX = 0
        if (!isFinite(normalY)) normalY = 0

        if (cornery || cornerx) {
            let closer = new Vec((
                closestX
            )
                ,
                closestY
            )

            let dist = closer.sub(b.pos)
            SEE_(closer.x, closer.y)
            let pen_depth = b.r - (dist.mag())
            let normal = new Vec(normalX, normalY)
            b.pos = b.pos.add(normal.mult(pen_depth));

            //!fromY? b.vel.x *=-b.elast : b.vel.y *=-b.elast;


            b.vel.mult(-b.elast);
            //b.vel = new Vec(0,0)
            return

        }
    }
    resolve(b) {
        this.split(2)
        if (true) {

            let Old_pos = b.pos.sub(b.vel)
            b.vel._mult(0.5)

            let dist_x = Old_pos.x - this.x
            let dist_y = Old_pos.y - this.y
            let ratio = this.sy / this.sx
            let Sign = (dist_x * ratio >= -dist_y / ratio) ? 1 : -1;
            let Sign2 = (dist_x * ratio >= dist_y / ratio) ? 1 : -1;
            let fromY = Sign * Sign2 < 0




            if (!fromY) { b.pos.x = this.x + (this.rx + b.r) * Math.sign(dist_x) }
            if (fromY) { b.pos.y = this.y + (this.ry + b.r) * Math.sign(dist_y) }
        }

    }
    act() {


        const cands = rtr0dmg.search(this.box);




        cands.forEach(cand => {

            const tolerance = -cand.object.r * 0.6;

            // Check if the object is overlapping the box



            const Winner = []
            let count = 0

            if (cand.object.pos.x > this.box.maxX) {
                let line1 = new Vec(this.x + this.rx, this.y + this.ry)
                let line2 = new Vec(this.x + this.rx, this.y - this.ry)
                Winner.push(Is_ball(cand.object, line1, line2))
                count++
            }
            if (cand.object.pos.y > this.box.maxY) {
                let line3 = new Vec(this.x + this.rx, this.y + this.ry)
                let line4 = new Vec(this.x - this.rx, this.y + this.ry)
                Winner.push(Is_ball(cand.object, line3, line4))
                count++
            }
            if (cand.object.pos.x < this.box.minX) {
                let line5 = new Vec(this.x - this.rx, this.y + this.ry)
                let line6 = new Vec(this.x - this.rx, this.y - this.ry)
                Winner.push(Is_ball(cand.object, line5, line6))
                count++
            }
            if (cand.object.pos.y < this.box.minY) {
                let line7 = new Vec(this.x + this.rx, this.y - this.ry)
                let line8 = new Vec(this.x - this.rx, this.y - this.ry)
                Winner.push(Is_ball(cand.object, line7, line8))
                count++
            }
            // 0 = is inside
            if (count == 0) { this.resolve(cand.object) }


            if (!Winner[0]) return
            Winner.sort((a, b) => a.D - b.D)
            if (Winner[0].D == Infinity) return

            if (!cand.object.WALL_AR) cand.object.WALL_AR = [];
            cand.object.WALL_AR.push(Winner[0])
            this.child.push(cand.object)
        }
        )
    }
    act() {
        this.child.forEach((c) => {
            if (!c.WALL_AR) return

            c.WALL_AR.sort((a, b) => a.D - b.D)
            if (c.WALL_AR[0].D == Infinity) return


            if (false && c.WALL_AR[1]) if (c.WALL_AR[1].D !== Infinity) {
                console.log(c.WALL_AR[0].Wl)
                c.WALL_AR[0] = MergeP(c.WALL_AR[0], c.WALL_AR[1])
                console.log(c.WALL_AR[0].Wl)
            }
            Coll_res(c.WALL_AR[0], c)



            c.WALL_AR = null
            delete c.WALL_AR
        })
        this.child = [];
    }
    // Modified dupe function for aligned and non-overlapping walls
    dupe(depth, isVertical) {
        if (depth <= 0) return; // Stop recursion at certain depth

        // Adjust wall size for alignment and spacing
        let newRx = isVertical ? this.rx : this.rx / 2;  // Width adjustment
        let newRy = isVertical ? this.ry / 2 : this.ry;  // Height adjustment

        // Position adjustment to avoid overlap
        let offsetX = isVertical ? 0 : this.sx;  // Move horizontally for vertical orientation
        let offsetY = isVertical ? this.sy : 0;  // Move vertically for horizontal orientation

        // Create two aligned walls from the current one
        let wall1 = new Wall(this.x + offsetX, this.y + offsetY, newRx, newRy);


        // Recursive branching with alternating orientations
        wall1.dupe(depth - 1, Math.random() > 0.5);
    }

    divi(depth) {

        let rando = (depth) / DEPTH
        let random2 = 1 - depth / DEPTH  // more randomization at smaller sizes

        let center = 1 - Math.abs(rando - 0.5)

        let prop = this.rx / this.ry

        let Dir = prop > 1 ? true : false
        let ratio = 0.5 + (S_ran(1) - 0.5) * random2 * 0.7
        let rat_inv = (1 - ratio)

        let newRx1 = Dir ? this.rx * ratio : this.rx
        let newRy1 = !Dir ? this.ry * ratio : this.ry
        let offsetX1 = Dir ? this.rx * rat_inv : 0
        let offsetY1 = !Dir ? this.ry * rat_inv : 0

        let newRx2 = Dir ? this.rx * rat_inv : this.rx
        let newRy2 = !Dir ? this.ry * rat_inv : this.ry
        let offsetX2 = Dir ? -this.rx * ratio : 0
        let offsetY2 = !Dir ? -this.ry * ratio : 0








        let X_t = ((-WG_x + this.x) / WL_x / 2 + 0.5)
        let Y_t = ((-WG_y + this.y) / WL_y / 2 + 0.5)

        let Cornerser = Math.max(Math.abs(X_t - 0.5), Math.abs(Y_t - 0.5)) * 2


        this.color = rgba_mix(WALL_COLOR, rgba(255, 255, 255, 1), Cornerser)
        this.bor_color = rgba_mix(this.color, rgba(0, 0, 0, 1), 0.6)



        let border = 1
        if (
            (this.x + this.rx * 2) < WG_x + WL_x &&
            (this.y + this.ry * 2) < WG_y + WL_y &&
            (this.x - this.rx * 2) > WG_x - WL_x &&
            (this.y - this.ry * 2) > WG_y - WL_y


        ) { border = 0 }

        let tollerance = Y_t / 3 + 1.2
        let min = 0
        let max = WL_x / 30 * X_t

        if (!border == 1) {  /// if wall is at the border don't delede it
            let DEL_THIS = 0

            if (S_ran() < 0) DEL_THIS = 1 // random delede wall
            if (prop > tollerance || prop < 1 / tollerance) DEL_THIS = 1 //delede wall who are too irregular
            //if (WG_x+Math.cos(this.x/(1))*WG_x > this.x ) DEL_THIS=1

            if (this.rx < min || this.ry < min) DEL_THIS = 1
            if (!(this.rx > max || this.ry > max)) DEL_THIS = 1
            if (false) DEL_THIS = 1

            DEL_THIS == 1 ? DELETED.push(this) : DEL_THIS = 0;

            newRx1 *= Math.min(1, 1 - Y_t + 0.7)
            newRy1 *= Math.min(1, 1 - Y_t + 0.7)
            newRx2 *= Math.min(1, 1 - Y_t + 0.7)
            newRy2 *= Math.min(1, 1 - Y_t + 0.7)

        }









        if (depth <= 1) return; // Stop recursion at certain depth
        if (true) {
            let wall1 = new Wall(this.x + offsetX1, this.y + offsetY1, newRx1, newRy1);
            wall1.divi(depth - ratio - 0.5 + (S_ran(1) - 0.5) * random2)
            let wall2 = new Wall(this.x + offsetX2, this.y + offsetY2, newRx2, newRy2);
            wall2.divi(depth - rat_inv - 0.5 + (S_ran(1) - 0.5) * random2)

        }



        if (true) {
            DELETED.push(this)
        }
    }
    split(depth) {
        if (this.sx + this.sy < 30) { return }
        let random2 = 1 - depth / DEPTH  // more randomization at smaller sizes
        let prop = this.rx / this.ry

        let Dir = prop > 1 ? true : false

        let ratio = 0.5 + (S_ran(1) - 0.5) * random2 * 0.7
        let rat_inv = (1 - ratio)

        let newRx1 = Dir ? this.rx * ratio : this.rx
        let newRy1 = !Dir ? this.ry * ratio : this.ry
        let offsetX1 = Dir ? this.rx * rat_inv : 0
        let offsetY1 = !Dir ? this.ry * rat_inv : 0
        let newRx2 = Dir ? this.rx * rat_inv : this.rx
        let newRy2 = !Dir ? this.ry * rat_inv : this.ry
        let offsetX2 = Dir ? -this.rx * ratio : 0
        let offsetY2 = !Dir ? -this.ry * ratio : 0


        if (depth <= 1) return; // Stop recursion at certain depth
        if (true) {
            let wall1 = new Wall(this.x + offsetX1, this.y + offsetY1, newRx1, newRy1);
            wall1.split(depth - 1)
            let wall2 = new Wall(this.x + offsetX2, this.y + offsetY2, newRx2, newRy2);
            wall2.split(depth - 1)
        }
        if (true) {
            DELETED.push(this)
        }
    }
}
function Is_ball_2(b, l1, l2) {
    let futurepos = b.pos.add(b.vel.mult(1))
    let lineN = l1.sub(l2).normal()
    let Wall_r = lineN.mult(b.r)
    Wall_r.x *= Math.sign(-b.vel.x)
    Wall_r.y *= Math.sign(b.vel.y)


    SEE_L(b.pos, futurepos, 'green')
    let shield_line1 = get_point1(b.pos, futurepos, l1.sub(Wall_r), l2.sub(Wall_r)) // perfect collision

    let wall_int = shield_line1.intersection.add(Wall_r)

    if (shield_line1.A && shield_line1.B) {
        let repos = shield_line1.intersection
        SEE_V(wall_int, 'red')
        SEE_V(repos, 'blue')

        return { Bl: repos, Wl: wall_int, D: repos.distSq(b.pos) - b.pos.distSq(wall_int), Nr: lineN }
    }

    //return {Bl:b.pos,Wl:wall_int,D:Infinity,Nr:lineN}
    let Seg = closestPointsOnSegments(b.pos, futurepos, l1, l2)

    if (b.r < Seg.dist + 0.001) return { Bl: b.pos, Wl: wall_int, D: Infinity, Nr: lineN }
    SEE_L(Seg.pA, Seg.pB) //pa = ball
    SEE_V(Seg.pB)


    return { Bl: Seg.pA, Wl: Seg.pB, D: Seg.pA.distSq(b.pos) - b.pos.distSq(Seg.pB), Nr: false }

    let D1 = l1.distSq(b.pos)
    let D2 = l2.distSq(b.pos)
    if (D1 < D2) {
        //let distDebt = (Seg.dist-b.r*1.1+0.001)
        //let unv = b.vel.unit()
        //let repos = Seg.pA.add(unv.mult(distDebt))

        let repos = futurepos.unit()
        repos = repos.mult(b.r + 0.001)
        repos._add(l1)


        SEE_V(repos, 'blue')
        SEE_V(l1, 'red')
        return { Bl: repos, Wl: l1, D: repos.distSq(b.pos), Nr: lineN }

    } else {
        //let distDebt = (Seg.dist-b.r*1.1+0.001)
        //let unv = b.vel.unit()
        //let repos = Seg.pA.add(unv.mult(distDebt))

        let repos = futurepos.unit()
        repos = repos.mult(b.r + 0.001)
        repos._add(l2)

        SEE_V(repos, 'blue')
        SEE_V(l1, 'red')
        return { Bl: repos, Wl: l1, D: repos.distSq(b.pos), Nr: lineN }
    }



    return { Bl: b.pos, Wl: wall_int, D: Infinity, Nr: lineN }
}
function Is_ball(b, l1, l2) {
    let futurepos = b.pos.add(b.vel.mult(1))
    SEE_L(b.pos, futurepos, 'green')

    let Seg = closestPointsOnSegments(b.pos, futurepos, l1, l2)

    let lineN = false

    if (Seg.dist > b.r && Seg.dist != b.r) return { Bl: b.pos, Wl: Seg.pB, D: Infinity, Nr: lineN }
    SEE_L(Seg.pA, Seg.pB, 'green') //pa = ball
    SEE_V(Seg.pB)

    if (Seg.pA.distSq(Seg.pB) < 5) Seg.pA._sub(b.vel.mult(0.05)) // kepp a bit of distance 

    return { Bl: Seg.pA, Wl: Seg.pB, D: b.pos.distSq(Seg.pB), Nr: false }
}
function get_point1(p1, p2, p3, p4) {
    // Line 1: p1 -> p2
    // Line 2: p3 -> p4

    // Calculate the direction vectors of the lines
    let d1 = p2.sub(p1); // Direction of Line 1
    let d2 = p4.sub(p3); // Direction of Line 2
    SEE_L(p3, p4, 'rgb(0,0,0,0.2)')
    SEE_L(p1, p2, 'rgb(255,0,0,0.1)')

    let intersection = p1

    // Calculate the determinant of the system (cross product of d1 and d2)
    let determinant = d1.x * d2.y - d1.y * d2.x;

    // If the determinant is 0, the lines are parallel or coincident
    if (determinant === 0) {
        return { intersection, A: false, B: false };
    }
    // Solve for the parameters t1 and t2 (using parametric equations)
    let diff = p3.sub(p1); // Vector between the start points of the lines
    let diff2 = p4.sub(p2); // Vector between the start points of the lines

    let t1 = (diff.x * d2.y - diff.y * d2.x) / determinant;
    let t2 = (d1.x * diff2.y - d1.y * diff2.x) / determinant;

    // Calculate the intersection point using t1
    intersection = p1.add(d1.mult(t1));
    // Check if the intersection lies on both segments
    const seg1 = t2 >= 0 && t2 <= 1; // Intersection is on the first segment // è in traiettoria giusta o opposta
    const seg2 = t1 >= 0 && t1 <= 1; // Intersection is on the second segment // oltrepassa la linea

    // Always return the intersection point of the lines, but flag no segment intersection
    SEE_V(intersection, "#000")
    return { intersection, A: seg1, B: seg2 };
}
function closestPointsOnSegments(a0, a1, b0, b1, c1 = true, c2 = true, c3 = true, c4 = true) {
    const clampA0 = c1, clampA1 = c2, clampB0 = c3, clampB1 = c4;

    const A = a1.sub(a0); // Vector for segment A
    const B = b1.sub(b0); // Vector for segment B
    const magA = A.mag(); // Length of segment A
    const magB = B.mag(); // Length of segment B

    const _A = A.unit(); // Unit vector for segment A
    const _B = B.unit(); // Unit vector for segment B

    const cross = _A.cross(_B); // Cross product to detect parallel lines
    const denom = cross.magSq(); // Squared magnitude of the cross product

    // Check if lines are parallel
    if (denom === 0) {
        const d0 = _A.dot(b0.sub(a0));

        if (clampA0 || clampA1 || clampB0 || clampB1) {
            const d1 = _A.dot(b1.sub(a0));
            // Determine if the segments overlap
            if (d0 <= 0 && d1 <= 0) {
                return { pA: a0, pB: b0, dist: a0.dist(b0) };
            } else if (d0 >= magA && d1 >= magA) {
                return { pA: a1, pB: b1, dist: a1.dist(b1) };
            }
        }

        // Parallel segments
        return { pA: (a0.avenge(a1)), pB: (b0.avenge(b1)), dist: a0.dist(b0) }
        //return { pA:null, pB:null, dist: a0.dist(b0) }; // problems
    }

    // Lines are not parallel: Calculate the closest points
    const t = b0.sub(a0);
    const detA = t.cross(_B).dot(cross);
    const detB = t.cross(_A).dot(cross);

    const t0 = detA / denom; // Closest point on segment A
    const t1 = detB / denom; // Closest point on segment B

    let pA = a0.add(_A.mult(t0));
    let pB = b0.add(_B.mult(t1));

    // Clamp projections
    if (clampA0 && t0 < 0) pA = a0;
    if (clampA1 && t0 > magA) pA = a1;

    if (clampB0 && t1 < 0) pB = b0;
    if (clampB1 && t1 > magB) pB = b1;

    // Adjust clamped points
    if ((clampA0 && t0 < 0) || (clampA1 && t0 > magA) || true) {
        const dot = _B.dot(pA.sub(b0));
        const clampedDot = Math.max(0, Math.min(dot, magB));
        pB = b0.add(_B.mult(clampedDot));
    }
    if ((clampB0 && t1 < 0) || (clampB1 && t1 > magB) || true) {
        const dot = _A.dot(pB.sub(a0));
        const clampedDot = Math.max(0, Math.min(dot, magA));
        pA = a0.add(_A.mult(clampedDot));
    }
    return { pA, pB, dist: pA.dist(pB) };
}
function MergeP(A, B) {

    console.log("DUBLE")
    let nn = A.Nr
    let bl = A.Bl
    let wl = A.Wl
    if (B.Wl.x && A.Wl.x) {
        wl = A.Wl.avenge(B.Wl, 0.5)
        SEE_V(wl, 'cyan')
    }
    if (B.Nr.x && A.Nr.x) {
        //nn = A.Nr.avenge(B.Nr,0.5)
    }
    if (B.Bl.x && A.Bl.x) {

        bl = A.Bl.avenge(B.Bl, 0.5)
        SEE_V(bl, 'magenta')

    }
    //////////////////////////
    return {
        Bl: bl,
        Wl: wl,
        Nr: nn
    }
    A.Bl = bl
    A.Wl = wl
    A.Nr = nn
}
function Coll_res(R, b) {
    if (!R) return; // Exit if no collision point provided

    //if (b == THE_PLAYER) console.log(R.Bl); // Debug log for player-specific logic
    if (isNaN(R.Bl.x + R.Bl.y)) { console.warn(R.Bl); return }

    // Draw collision point for visualization

    // Vector from the circle's center to the collision point

    let normal = R.Nr
    if (!normal.x) {
        normal = R.Wl.sub(R.Bl).normal() // distnce is br so no squareroot
    } else { normal.normal() }


    let reposi = R.Wl.sub(R.Bl)._givelengt(-b.r)
    b.pos = R.Wl.add(reposi)

    SEE_L(R.Wl.add(normal.mult(100)), R.Wl, 'red');

    SEE_L(b.pos, R.Wl, 'grey');
    SEE_V(b.pos, 'grey');
    SEE_L(b.pos, b.pos.add(b.vel), 'green');

    // Resolve penetration: Reposition circle to ensure no overlap


    // Decompose velocity into normal and tangential components
    const vel1 = Vec.dot(b.vel, normal); // Component along the normal
    let swappedN = normal.swap()
    const vel2 = Vec.dot(b.vel, swappedN); // Component along the tangent

    b.vel = normal.mult(vel1).add(swappedN.mult(-vel2 * b.elast))

    repos(b)

}

console.log(THE_PLAYER)
function WG_o_rand_gun(NB, is_turret = false) {
    let BL_HP = S_ran(50)
    let BL_ranDir = (S_ran())
    let BL_DMG = S_ran(2) + 0.01
    let BL_AGE = S_ran(600)
    let BL_COUNT = 1 + Math.trunc(5 * S_ran(1) ** 5)
    let BL_RELOAD = (S_ran(150) + 3) / 1000
    let BL_ranVel = (S_ran(60))
    let BL_SPEE = S_ran(30)
    let b_size = 1 / 8 + S_ran(0.4)

    console.log(NB)
    let rel_rot = 0 //(i2)*P2/(Main-1)/Gun_sepa
    let Perform_cost = (BL_AGE * 0.2) * (BL_RELOAD)
    if (Perform_cost > 5) {
        console.log("TROPPPPPSPSPSP:" + Perform_cost)
        BL_RELOAD /= Perform_cost
        FREPOWER = BL_DMG * BL_HP * BL_RELOAD
        Perform_cost = (BL_AGE * 0.2) * (BL_RELOAD)
    }
    1

    let wp = {
        reload: BL_RELOAD,
        recoil: 90,
        bl_n: BL_COUNT,
        bl_sn: BL_COUNT * 20,
        internal_setup: is_turret ? gun_0t_setup : gun_0_setup,
        setup_stats: {
            r: 0.5,
            rel_rot_max: 1
        }
    };
    //if(!is_turret)wp = {}
    let bl = {
        frict: 0.98,
        r: b_size,
        m: 0.1,
        inv_m: 1 / 0.1,
        hard: 0.0,
        elast: 0,
        slide: 0,
        stk: 0,
        maxage: BL_AGE,
        hp: BL_HP,
        maxhp: BL_HP,
        dmg: BL_DMG,
        arrays: [KILLABLE, DRW_2, COLLI_BDMG, REPOS],
        ran_rot: BL_ranDir,
        ran_vel: BL_ranVel,
        rel_rot: rel_rot,
        rel_vel: BL_SPEE,
        relat: {
            bou: 1,//0 = don't do //1 = do //-1 = don't do even if other do 2= do even if other is -1
            ing: 0,// on equal ranks es: 2  other minion 
            bou_0: 1,
            ing_0: 1,// on superior ranks es: 1 players
            bou_1: 1,
            ing_1: 0,// on inferior ranks es: 3 bullets    // cannot ingore differents team
        }
    }

    return new gun0(NB, bl, wp)
}
function WG_PLAYER() {
    if (!COLLI_BDMG[0] || !COLLI_BDMG[0].maxhp) {
        THE_PLAYER = new Ball()
        //  THE_PLAYER.x = 0
        // THE_PLAYER.y = 0
        THE_PLAYER.mouse = {}
        //THE_PLAYER.hp = -1

    }
    else {
        THE_PLAYER = COLLI_BDMG[0]

        //DELETED.push(THE_PLAYER.child[0])


        THE_PLAYER.hp = THE_PLAYER.maxhp
        if (!THE_PLAYER.spead) THE_PLAYER.spead = 4

        camera.zoom = THE_PLAYER.fov ?? 1 / 3

        if (!THE_PLAYER.mouse) THE_PLAYER.mouse = { x: THE_PLAYER.pos.x, y: THE_PLAYER.pos.x }
        let old_act = THE_PLAYER.act
        THE_PLAYER.act = function () {
            old_act.call(THE_PLAYER)
            let sound = this.old_hp - this.hp
            if (sound > 0) {
                let aud = new Audio('rammig.mp3');
                aud.volume = Math.min(1, sound / this.maxhp * 3 + 0.001);
                //aud.play();
            }
            this.old_hp = this.hp
        }

        for (let i = 0; i < THE_PLAYER.child.length; i++) {
            const e = THE_PLAYER.child[i];
            if (e.target) e.DIE()
        }
    }

    //   let group = new Group();
    //   group.addBall(NB);
    //group.addBall(newBal2);
}
let WG_MEGAMOUNTAIN_c = S_ran(111) + 33
function WG_MEGAMOUNTAIN(count = 142, Size = 1000, spread = 19001) {
    let lum = WG_MEGAMOUNTAIN_c

    for (let i = 0; i < count; i++) {


        let ci = i / count

        let dist = spread
        let vecp = new Vec(dist, 0)
        vecp._rotate(P2 * ci)
        let Gsx = vecp.x
        let Gsy = vecp.y

        let NB = new Ball
        NB.pos.x = Gsx + WG_x
        NB.pos.y = Gsy + WG_y
        NB.pos_o.x = Gsx + WG_x
        NB.pos_o.y = Gsy + WG_y
        NB.r = Size
        NB.m = Size * Size * 333333 / 152;
        NB.inv_m = 1 / NB.m
        NB.elast = 0.2;


        NB.hard = 100;
        NB.slide = 0.6;
        NB.stk = 0
        NB.frict = 0.8;

        NB.color = new RGBA(lum, lum, lum)
        NB.bor_col = NB.color.lig(-0.5)


        NB.col = {
            _: NB.color,
            b: NB.bor_col,
        }

        NB.vel.x = 0
        NB.vel.y = 0
        NB.arrays = [DRW_3, COLLI_B]

        NB.random = Math.random()


        NB.drw_3 = function () {
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
            ctx.fillStyle = this.col._.c;
            ctx.strokeStyle = this.col.b.c;
            ctx.lineWidth = this.bor_s
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
        Get_bor_s(NB)
        Array_push(NB)
    }
}
function WG_Poly(number, spread) {



    let gl1 = S_ran(255)
    let gl3 = S_ran(255)
    let gl2 = S_ran(255)
    let rand3 = S_ran()
    let rscale2 = S_ran(20) - 10



    for (let i = 0; i < number; i++) {
        if (i == Math.round(number / 3)) {
            gl1 = S_ran(255)
            gl3 = S_ran(255)
            gl2 = S_ran(255)
            rand3 = S_ran()
            rscale2 = S_ran(20) - 10
        }
        let vecp = new Vec((1 - (S_ran(1))) * spread, 0)
        vecp._rotate(S_ran(P2))
        let Gsx = vecp.x
        let Gsy = vecp.y
        let size = S_ran(234) - 34
        let mmu = S_ran(8) + 2
        let rand4 = S_ran() * S_ran()
        let rand5 = S_ran() * S_ran() * S_ran() / 2
        let forr6 = S_ran() < 0.5 ? 0 : 1
        let rand6 = Math.abs(Det_gaussR(0, 0.003)) * forr6 + ((1 - forr6))
        let rand7 = Math.abs(Det_gaussR(0, 0.002))
        let rand8 = Math.max(0, S_ran() * 7.3 - 6) * S_ran() * S_ran()

        for (let i = 0; i < S_ran(31) + 8; i++) {

            let distx = Det_gaussR(0, i)
            let disty = Det_gaussR(0, i)

            let NB = new Ball()
            NB.pos.x = distx + WG_x + Gsx,
                NB.pos.y = disty + WG_y + Gsy,

                NB.r = 9 + Math.abs(size * S_ran() + rscale2),

                NB.m = mmu + (NB.r) * mmu / 40
            NB.inv_m = 1 / NB.m
            NB.elast = rand4

            let Apha = Math.min(Math.max(Det_gaussR(0, rscale2 * 0.01) + rand3, 0), 1)
            NB.color = new RGBA(
                gl1 + rscale2 * 13 * S_ran(),
                gl2 + rscale2 * 13 * S_ran(),
                gl3 + rscale2 * 13 * S_ran(),
                Apha)
            NB.m *= S_ran() * NB.r / 12

            NB.bor_col = new RGBA(gl1 - rscale2 * S_ran(14), gl2 - rscale2 * S_ran(14), gl3 - rscale2 * S_ran(14), 0.5)
            NB.vel.x = 0.03
            NB.hard = rand6
            NB.frict = 1 - rand5
            NB.slide = rand7
            NB.stk = rand8
            NB.vel.x = distx / 12
            NB.vel.y = disty / 12


            NB.owner = NB;
            NB.rank = 1
            NB.team = Gsx
            let HP_scale = (NB.r ** 1.5) * (3) * Apha
            NB.maxhp = HP_scale;
            NB.hp = HP_scale
            NB.dmg = 0.4;
            NB.age = S_ran() * 4021
            NB.regen = 0.005
            NB.rg_wait = 1
            old_hp = 2220

            NB.relat = {
                bou: 1,
                ing: 0,
                bou_0: 1,
                ing_0: 0,
                bou_1: 1,
                ing_1: 0,
            }



            NB.sign = S_ran() < 0.5 ? 1 : -1



            NB.act = F_regen




            NB.drw_2 = function () {
                drawB01(this)

                if (this.hp < this.maxhp) {
                    if (this.hp <= 0) return
                    let per = 1 - ((this.maxhp - this.hp) / this.maxhp)

                    let halfp = 1 - (((per))) ** 5

                    let perc = per * P2
                    let C = (NB.sign * this.age / 331)

                    ctx.beginPath();
                    ctx.arc(this.pos.x, this.pos.y, this.r * (0.85), 0, P2);
                    ctx.strokeStyle = this.color.c;
                    ctx.lineWidth = this.r * 0.1 * halfp
                    ctx.stroke();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.arc(this.pos.x, this.pos.y, this.r * (0.85), 0.0001 + C, perc + C);
                    ctx.strokeStyle = this.bor_col.c;
                    ctx.lineWidth = this.r * 0.2 * halfp
                    ctx.stroke();
                    ctx.closePath();
                }
            }
            NB.arrays = [DRW_2, COLLI_BDMG, REPOS, KILLABLE, ACT]
            NB.DIE = DIE_2
            NB.DIE_anim = DIE_anim01
            Array_push(NB)

            NB.rotation = 0
            //new cl_body(NB)

            Get_bor_s(NB)
            F_act_setup_growth(NB)
        }
    }


}
function WG_Enemy3(number, spread, number2, spread2,) {

    for (let iV = 0; iV < number; iV++) {

        let size = 10 + S_ran(20) //+ (S_ran(1) ** 76) * 900

        let vecp = new Vec(S_ran(1) * spread, 0)
        vecp._rotate(S_ran(P2))
        let Gsx = vecp.x
        let Gsy = vecp.y


        let gl1 = Scale_n(S_ran(1), 0, 255, 1)
        let gl3 = Scale_n(S_ran(1), 0, 255, 1)
        let gl2 = Scale_n(S_ran(1), 0, 255, 1)


        let rscale2 = Scale_n(S_ran(1), -10, 10)
        let rand4 = S_ran(1) * S_ran(1)
        let forr6 = Scale_n(S_ran(1), 0, 1, 1)
        let rand6 = Math.abs(Det_gaussR(0, 0.003)) * forr6 + ((1 - forr6))
        let rand7 = Math.abs(Det_gaussR(0, 0.002))
        let rand8 = Math.max(0, S_ran(1) * 7.3 - 6) * S_ran(1) * S_ran(1)
        for (let i = 0; i < number2 + S_ran(number2) - number2 / 2; i++) {
            let NB = new Ball()
            NB.pos = new Vec(Det_gaussR(0, size * spread2) + WG_x + Gsx, Det_gaussR(0, size * spread2) + WG_y + Gsy)
            NB.vel = new Vec((S_ran(1) * 12 - 6), (S_ran(1) * 12 - 6))
            NB.inv_m = 1 / NB.m
            NB.elast = rand4
            NB.color = rgba(
                gl1 + rscale2 * 13 * S_ran(1),
                gl2 + rscale2 * 13 * S_ran(1),
                gl3 + rscale2 * 13 * S_ran(1),
                1)
            NB.bor_col = rgba_mix(NB.color, COL.bor_1, COL.bor_trasp1)
            NB.vel.x = 0.03
            NB.hard = rand6
            NB.slide = rand7
            NB.stk = rand8
            NB.rotation = S_ran(1) * 12
            NB.owner = NB;
            NB.team = S_ran(1) < 0.7 ? NB.color : rand4 + rand8
            NB.r = size * (S_ran(1.5) + 0.5),
                NB.m = 1
            NB.spead = 1
            NB.frict = 1
            NB.maxhp = 1
            NB.fov = 1
            SCALLING(NB)
            NB.spead *= S_ran(1.5) + 0.5
            NB.hp = NB.maxhp * 0.8
            NB.dmg = 1;
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
            NB.DIE_anim = DIE_anim0
            NB.arrays = [COLLI_BDMG, REPOS, KILLABLE]
            Array_push(NB)

            new hp_diplay(NB)
            new cl_name(NB, F_get_randomname())
            new hp_regen(NB, 0.05)

            //WG_o_rand_gun(NB,true)

            SmashHP = Math.floor(S_ran(12) - 5)
            if (SmashHP > 0) {
                new cl_spike(NB, SmashHP + 1, 300, 1, 0.9, 0.8, true)
                NB.maxhp *= 1 + SmashHP / 4
            }
            new cl_body(NB)

            let gun = WG_o_rand_gun(NB)
            new cl_AI(NB, gun)

            let Dmg_ = Math.floor(S_ran(13 + 20)) - 20
            if (Dmg_ > 2) {
                new cl_spike(NB, Dmg_)
                NB.dmg *= 1 + (Dmg_) / 4
            }





            if (S_ran() < 0.5) {//aura
                const aura_stats_esample2 = {
                    size: 130,
                    dmg: 0.2,
                    color_scale: 2.2,
                    bor_scale: 0.05,
                    color_func: (X) => rgba_mult(COL.black, 1, 1, 1, 0.9),
                    bor_col_func: (X) => rgba_mult(rgba_max_sat(X.owner.color), 1, 1, 1, 0.5),

                    arrays: [ACT_, DRW_1],
                    FUNTION_G: {
                        drw_1: function drw_1() {
                            ctx.globalCompositeOperation = "ply";
                            aura_draw1.call(this)
                            ctx.globalCompositeOperation = "source-over";
                        },
                        act_: F_o_auraDmg
                    }
                };








                if (S_ran() < 0.8) {
                    aura_stats_esample2.arrays = [ACT_, DRW_3],
                        aura_stats_esample2.color_func = (X) => rgba_mult(rgba_max_sat(X.owner.color), 1, 1, 1, 0)
                    aura_stats_esample2.bor_col_func = (X) => rgba_mult(rgba_max_sat(X.owner.color), 1, 1, 1, 0.7)
                    aura_stats_esample2.FUNTION_G.drw_3 = function drw_3() {
                        ctx.globalCompositeOperation = "screen";
                        const Amount = 1
                        aura_draw0.call(this)
                        ctx.globalCompositeOperation = "source-over";
                    }
                }
                new cl_aura0(NB, aura_stats_esample2)
            }
        }
    }


}






// World generation function with depth and alignment control - and gamerules
function WG_WALLS_OLD(depth = 1) {

    let borde1 = 6000
    let borde2 = 4000
    let N = 3.5
    let bordersize = borde1
    let bordersize2 = borde2
    let angle = bordersize / N
    let border1 = new Wall(WG_x + bordersize * N, WG_y + angle, bordersize / N, bordersize2 * N)
    let border2 = new Wall(WG_x - angle, WG_y + bordersize2 * N, bordersize * N, bordersize / N)
    let border3 = new Wall(WG_x - bordersize * N, WG_y - angle, bordersize / N, bordersize2 * N)
    let border4 = new Wall(WG_x + angle, WG_y - bordersize2 * N, bordersize * N, bordersize / N)

    let startWall = new Wall(WG_x, WG_y, borde1, borde2);
    startWall.divide(depth); // Start with vertical orientation

    // Generate additional clusters at different locations
}
const WALL_COLOR = rgba(35, 35, 35, 1)
const DEPTH = 13
const WL_x = 9000
const WL_y = 9000
function WG_WALLS() {

    let borde1 = WL_x
    let borde2 = WL_y
    let N = 2
    let bordersize = borde1
    let bordersize2 = borde2
    let angl = 4
    let angle = bordersize / angl
    new Wall(WG_x + bordersize + angle, WG_y, bordersize / angl, bordersize2 + angle * 2)
    new Wall(WG_x, WG_y + bordersize2 + angle, bordersize, bordersize / angl)
    new Wall(WG_x - bordersize - angle, WG_y, bordersize / angl, bordersize2 + angle * 2)
    new Wall(WG_x, WG_y - bordersize2 - angle, bordersize, bordersize / angl)

    let startWall = new Wall(WG_x, WG_y, borde1, borde2);

    startWall.divi(DEPTH); // Start with vertical orientation

    // Generate additional clusters at different locations
}
function WG_WORLD() { }

function Game_mode_rule() {
}

if (true) {
    let duel_guys = [1, 2];
    let timer = 90
    Game_mode_rule = function () {

        if (!(duel_guys[1].hp > 0) || !(duel_guys[0].hp > 0)) { timer += 1 
           if (timer % 20 == 0) {
            if(duel_guys[1].hp > 0) {new cl_chat(duel_guys[1])}
            if(duel_guys[0].hp > 0) {new cl_chat(duel_guys[0])}
           }
        }
        if (timer < 100) return
        let old = THEME[0]
        THEME.splice(0,1)
        THEME.sort((a,b) => b.probability*Math.random() - a.probability*Math.random())
        THEME.push(old)

        timer = 0
        duel_guys[0].hp = -20
        duel_guys[1].hp = -20
        for (const key in BU) { // make an object and count the value
            if (Object.prototype.hasOwnProperty.call(BU, key)) {
                BU[key] = 1 - Math.random() ** 1;

            }
        }
        duel_guys = Start_Duel()

    }

}
if (true) {

    let siz = 1011
    let sizSq = siz**2
    let center = new Vec(0,0)

    var drawborder = {}
    drawborder.drw_1 = function(){
    ctx.beginPath()
    ctx.fillStyle = "#22222211"
    ctx.arc(center.x,center.y,siz,0,P2,true)
    ctx.arc(center.x,center.y,siz*2,0,P2*8)
    ctx.fill()
    ctx.closePath()
    }
    DRW_1.push(drawborder)

    let old = Game_mode_rule
    Game_mode_rule = function () {
    old()

    REPOS.forEach(b => {
        const distsq = center.distSq(b.pos)
        //if (distsq>sizSq) {b.pos= center}

        if (distsq>sizSq) {
            b.vel._add(center.sub(b.pos).unit().mult((distsq-sizSq)**0.25*0.02))
        } //1/(distsq-sizSq)


        if (false) {
            if(b.pos.x >= siz) b.vel.x -=1
            if(b.pos.y >= siz) b.vel.y -=1
            if(b.pos.x <= -siz) b.vel.x +=1
            if(b.pos.y <= -siz) b.vel.y +=1
        }
    });}
}

//////////////////////////////////////////////////////////// pre function
let frameCount = 0;
const rtr0dmg = rbush();
const rtr1bal = rbush();

function insertColliders() {
    const CO_0 = [];
    COLLI_BDMG.forEach((obj) => {
        obj.a0 = true;  // ensure onject calculate collisions 1 time,
        CO_0.push(getMBR(obj));
    });
    rtr0dmg.load(CO_0);

    return
    const CO_B = [];
    COLLI_B.forEach((obj) => {
        CO_B.push(getMBR(obj));
    });
    rtr1bal.load(CO_B);
}
function Collider_sort(coll, funct) {
    coll.sort((a, b) => a.pos.x - b.pos.x)
    for (let i = 0; i < coll.length; i++) {
        let j2 = 0
        for (let i2 = 1; i2 < 2; i2++) {
            j2++
            if (coll[i + j2]) {
                let sum = coll[i].r + coll[i + j2].r
                if (
                    coll[i + j2].pos.x - coll[i].pos.x < sum
                ) {
                    ///////////////////
                    if (Math.abs(coll[i + j2].pos.y - coll[i].pos.y) < sum) { funct(coll[i], coll[i + j2]) }
                    ///////////////////
                    i2--
                }
            }
        }
        j2 = 0
        for (let i2 = 1; i2 < 2; i2++) {
            j2++
            if (coll[i - j2]) {
                let sum = coll[i].r + coll[i - j2].r
                if (coll[i - j2] &&
                    coll[i].pos.x - coll[i - j2].pos.x < sum
                ) {
                    ///////////////////
                    if (Math.abs(coll[i].pos.y - coll[i - j2].pos.y) < sum) funct(coll[i], coll[i - j2])
                    ///////////////////
                    i2--
                }
            }
        }
    }
    return

}
function Collider_sort2(coll, funct) {
    // Sort by x-coordinate
    coll.sort((a, b) => a.pos.x - b.pos.x);

    // Sweep-and-prune for collision detection
    for (let i = 0; i < coll.length; i++) {
        const current = coll[i];
        // Compare with subsequent objects
        for (let j = i + 1; j < coll.length; j++) {
            const neighbor = coll[j];
            const maxRadiusSum = coll[i].r + neighbor.r;

            // Break if the x-distance exceeds max possible radius sum
            if (neighbor.pos.x - current.pos.x > maxRadiusSum) break;

            // Check y-distance
            if (Math.abs(neighbor.pos.y - current.pos.y) < maxRadiusSum) {
                // Check Euclidean distance
                const dx = neighbor.pos.x - current.pos.x;
                const dy = neighbor.pos.y - current.pos.y;
                if (dx * dx + dy * dy < maxRadiusSum * maxRadiusSum) {
                    funct(current, neighbor);
                }
            }
        }
    }
}



class Function_generator {
    constructor() {
        this.n = {};
        this.existing = []; // actives operator names (string) with array order
        this.defualts = [];


        for (let i = 0; i < 15; i++) {
            this.gen_NE()
        }
        this.assing(4)
        console.log(this)
    }
    gen_NE() {
        let name = namegen()
        let value = (Math.random() - 0.5) * 2
        let NE = { val: value, ogv: value, to: [] }

        let oper = random_oper()
        NE.f = function f() {
            for (let i = 0; i < NE.to.length; i++) {
                NE.to[i].val = oper(NE.val, NE.to[i].val)
            }
        }

        this.n[name] = NE
        this.existing.push(name)

    }
    assing(amount) {
        let l = this.existing.length
        for (let i = 0; i < l; i++) {

            for (let j = 0; j < amount; j++) {
                let rand = Math.trunc(l * Math.random());
                this.n[this.existing[i]].to.push(this.n[this.existing[rand]])
            }
        }
    }
    calc() {
        for (let i = 0; i < this.existing.length; i++) {
            console.log(this.n[this.existing[i]])
            this.n[this.existing[i]].f()
        }
    }
    clean() {
        for (let i = 0; i < this.existing.length; i++) {
            this.n[this.existing[i]].val = this.n[this.existing[i]].ogv
        }
    }
    mutate() {
        for (let i = 0; i < this.existing.length; i++) {
            let NE = this.n[this.existing[i]]

            if (Math.random() < 0.3) {
                NE.ogv += (Math.random() - 0.5) / 32
            }

            if (Math.random() < 0.05) {
                let oper = random_oper()
                NE.f = function f() {
                    for (let i = 0; i < NE.to.length; i++) {
                        NE.to[i].val = oper(NE.val, NE.to[i].val)
                    }
                }
            }
            if (Math.random() < 0.05) {
                let l = this.existing.length
                let rand = Math.trunc(l * Math.random());

                if (Math.random() < 0.5 && NE[1]) {
                    NE.splice(0, 1)
                }
                NE.to.push(this.n[this.existing[rand]])
            }
        }// general mutation
        //calc order mutation
        // add mutation
        // removal mutation
    }
}
function random_oper() {


    max = function (n0, n) { return Math.max(n, n0) }
    min = function (n0, n) { return Math.min(n, n0) }
    add = function (n0, n) { return n + n0 }
    neg = function (n0, n) { return -n - n0 }
    mult = function (n0, n) {
        return a = n * n0
    }
    mid = function (n0, n) { return (n + n0) / 2 }
    exp = function (n0, n) {
        let a = Math.abs(n) ** n0
        return a == Infinity || a == NaN ? 0 : a * Math.sign(n)
    }
    exp_to = function (n0, n) {
        let a = Math.abs(n0) ** n
        return a == Infinity || a == NaN ? 0 : a * Math.sign(n)
    }
    sin = function (n0, n) { return Math.sin(n + n0) }

    const operations = [
        neg,
        add,
        mid,
        mult,
        max,
        min,
        sin,
        exp,
        exp_to,
    ]
    let rn = Math.trunc((Math.random()) * operations.length)
    return operations[rn]
}
function namegen() {
    var color = 'a';
    color += [Math.round((1 + Math.random()) * 1000)];
    color = '_' + color.slice(2);
    return color;
}
///////////////////////////////////////////////////////////

class Group_rigid {
    constructor(collider) {
        this.child = [];
        collider.forEach((c) => {
            this.child.push(c)
            c.arrays.push(this.child)
            c.owner = this
        })
        this.rotation = 0
        this.rot_vel = 0
        this.get_masscenter() // this.pos //this.m
        this.get_relpos() /// create special vectors where z is distance
        this.get_vel()
        this.arrays = [ACT1];
        ACT1.push(this)
    }
    get_masscenter() {
        let sum = new Vec(0, 0)
        this.m = 0
        for (let i = 0; i < this.child.length; i++) {
            const c = this.child[i]
            this.m += c.m;

            sum.x += c.m * c.pos.x;
            sum.y += c.m * c.pos.y;
        }
        this.pos = sum.mult(1 / this.m)
    }
    get_relpos() {
        for (let i = 0; i < this.child.length; i++) {
            this.child[i].g_rel_pos = this.child[i].pos.sub(this.pos)
            this.child[i].g_rel_pos.z = this.child[i].g_rel_pos.dist(this.pos) // move this from here to inside the
        }
    }
    get_vel() {
        let sum = new Vec(0, 0)
        for (let i = 0; i < this.child.length; i++) {
            sum._add(this.child[i].vel.mult(this.child[i].m))
        }
        this.vel = sum.mult(1 / this.m)


        for (let i = 0; i < this.child.length; i++) {
            let ro = this.child[i].pos.sub(this.pos).normal()
            let ggf = ro.cross(this.child[i].vel)
            SEE_T(this.child[i].pos, (ggf.x))
            SEE_T(this.child[i].pos.add(new Vec(0, -33)), (ggf.y))
        }
    }
    //// get rotations
    /// repos the group
    repos() {
        this.pos._add(this.vel)
        this.rotation += this.rot_vel
        console.log(this)
        for (let i = 0; i < this.child.length; i++) {
            this.child[i].pos = this.child[i].g_rel_pos.rotate(this.rotation).add(this.pos)
            this.child[i].vel.mult(this.child[i].frict)
        }
    }
    act1() {
        this.get_vel()
        this.repos()
    }
}
function ASA() {
    new Group_rigid(REPOS)
    REPOS.length = 0
}









///////////////////////////////////////////////////////////// world generation
if (false) {
    let sizewwq = 2190
    WG_MEGAMOUNTAIN(6, sizewwq * 0.2, sizewwq * 0.5)
    WG_MEGAMOUNTAIN(12, sizewwq * 0.05, sizewwq * 0.60)
    WG_MEGAMOUNTAIN(24, sizewwq * 0.06, sizewwq * 0.8)
    WG_MEGAMOUNTAIN(6, sizewwq * 0.09, sizewwq * 0.70)
    WG_MEGAMOUNTAIN(12, sizewwq * 0.08, sizewwq * 0.91)
    WG_MEGAMOUNTAIN(60, sizewwq * 0.08, sizewwq)
    //WG_Enemy3(7, 4271, 4, 33)
    WG_Poly(64, sizewwq * 0.8)
    WG_PLAYER()
}
//WG_Poly(64, 2190 * 0.8)

THE_PLAYER = new Ball(); THE_PLAYER.mouse = {}
for (let i = 0; i < DELETED.length; i++) {
    DELETED[i] == null
    DELETE(DELETED[i])
}
DELETED.splice(0, DELETED.length)
//////////////////////////////////////////////////////////// loop
function mainLoop() {
    frameCount++;
    MovePlayer();
    Game_mode_rule();
    /////// object creation spawning
    //if(COLLI_BDMG.length<560){WG_Poly(1, sizewwq*0.8)}
    ///////////////
    ACT0.forEach(b => { b.act0() });
    insertColliders() /// this function do't affect acts need to be before repos?
    REPOS.forEach(b => {
        b.pos_o = new Vec(b.pos.x, b.pos.y)
        b.pos = b.pos.add(b.vel);
        b.vel = b.vel.mult(b.frict);
    });
    ACT1.forEach(b => { b.act1() });
    //////////////////////////////////////
    COLLI_BDMG.forEach(b => {
        if (b.vel.x == 0 && b.vel.y == 0) return;
        const cands = rtr0dmg.search(voidMBR(b));
        cands.forEach(cand => {
            if (cand.object !== b && cand.object.a0) {
                Complete_collision_DMG(b, cand.object)
            }
        });
        delete b.a0
    });
    COLLI_B.forEach(b => {
        const cands = rtr0dmg.search(voidMBR(b));
        cands.forEach(cand => {
            Complete_collision(b, cand.object)
        });
    });
    ACT.forEach(b => { b.act() });
    ///////////////// kills management
    for (let i = 0; i < KILLABLE.length; i++) {
        const k = KILLABLE[i];
        k.age++
        if (k.age > k.maxage || !(k.hp > 0) || k.died_time) {
            k.DIE()
        }
    }
    ///////////////// last function before draw
    ACT_.forEach(b => { b.act_(); });
    ///////////////// drawing
    Camera();
    Background_a();
    THE_PLAYER.rotation = Get_rotation(mousePos.x, mousePos.y, THE_PLAYER)
    for (let i = DRW_1.length - 1; i > -1; i -= 1) {
        DRW_1[i].drw_1()
    }
    for (let i = DRW_2.length - 1; i > -1; i -= 1) {
        DRW_2[i].drw_2()
    }
    for (let i = DRW_3.length - 1; i > -1; i -= 1) {
        DRW_3[i].drw_3()
    }

    Uppereffect_a();
    //////////// Last functions
    for (let i = 0; i < DELETED.length; i++) {
        DELETED[i] == null
        DELETE(DELETED[i])
    }
    DELETED.length = 0
    rtr0dmg.clear();

    /// visualization for thing 
    ctx.globalCompositeOperation = "source-over";
    SEE_X.forEach(b => {
        let S = Math.random()
        if (b.c) {
            drawStar(b.x, b.y, 9, 3 / camera.zoom * S, 2 / camera.zoom * S, b.c, b.c);
            return new Vec(b.x, b.y)
        }


        drawStar(b.x, b.y, 9, 3 / camera.zoom * S, 2 / camera.zoom * S, getRandomColor() + 92, getRandomColor() + 91)
        return new Vec(b.x, b.y)
    });
    SEE_Lv.forEach(v => {
        ctx.beginPath();
        ctx.moveTo(v.b.x, v.b.y); //v is start pos
        ctx.lineTo(v.a.x, v.a.y);
        ctx.strokeStyle = v.c;
        ctx.lineWidth = 1
        ctx.stroke();
        ctx.closePath();
    });
    SEE_Tv.forEach(v => {
        ctx.beginPath();
        ctx.moveTo(v.a.x, v.a.y); //v is start pos
        ctx.lineWidth = 3
        ctx.strokeStyle = '#000'
        ctx.fillStyle = v.c
        ctx.font = `bold ${15 / camera.zoom}px Arial`;
        ctx.textAlign = "center";
        ctx.strokeText(v.b, v.a.x, v.a.y);
        ctx.fillText(v.b, v.a.x, v.a.y);
        ctx.closePath();
    });
    SEE_X = [];
    SEE_Lv = [];
    SEE_Tv = [];
    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop)





// un used
if (false) {
    class bx {
        constructor(b) {
            this.bx = b.pos.x + Math.max(b.vel.x, 0)
            this.by = b.pos.y + Math.max(b.vel.y, 0)
            this.sx = b.pos.x + Math.min(b.vel.x, 0)
            this.sy = b.pos.y + Math.min(b.vel.y, 0)
            this.o = b
        }
    }
    const COLL = [];
    [COLLI_B, COLLI_BDMG].forEach((colli) => {
        colli.forEach((b) => {
            COLL.push(new bx(b));
        });
    });
    const ttb_res = [];
    class ttb {
        constructor(array, size, idk) {
            this.size = size // size is only positive, are the object who are traslet to positive cordinates  before calculkation to simplify
            this.array = array
            if (this.array.length > 1) { this.split() } // if there is more than one obj split
        }
        split() {
            const a = [];
            const b = [];
            for (let i = 0; i < this.array.length; i++) {
                if (this.array[i].bx > this.size) { a.push(this.array[i]) } else { b.push(this.array[i]) }
            } // included in a array

            for (let i = 0; i < this.b.length; i++) {
                if (this.b[i].bx > this.size) { a.push(this.b[i]) }
            } //included b in a array allowing a array to skip 1 check


            if (a.length + b.length == 2 * this.array.length) { return } // there is at lest 2 object and they overlap in this axis
            this.a = new ttb(a, this.size + this.size / 2)
            this.b = new ttb(b, this.size / 2)
        }
    }
    function object_based_grild_collision_detection_test4(array = COLLI_BDMG, CELL_SIZE = 16) {
        const base = {}; // The grid with only occupied cells to save memory

        for (let i = 0; i < array.length; i++) {
            const collider = array[i];

            // Compute grid cell indices
            let X = Math.round(collider.pos.x / CELL_SIZE);
            let Y = Math.round(collider.pos.y / CELL_SIZE);
            let X2 = X + 1;
            let Y2 = Y + 1;

            ctx.beginPath()
            ctx.fillStyle = "rgba(0, 0, 0, 0.01)"
            ctx.rect(X * CELL_SIZE, Y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            ctx.rect(X * CELL_SIZE, Y * CELL_SIZE, -CELL_SIZE, -CELL_SIZE)
            ctx.fill()
            ctx.fillStyle = "rgba(96, 0, 221, 0.01)"
            ctx.rect(X * CELL_SIZE, Y * CELL_SIZE, CELL_SIZE, -CELL_SIZE)
            ctx.rect(X * CELL_SIZE, Y * CELL_SIZE, -CELL_SIZE, CELL_SIZE)
            ctx.fill()
            ctx.closePath();

            // Define grid keys
            let keys = [`a${X}a${Y}`, `a${X2}a${Y}`, `a${X}a${Y2}`, `a${X2}a${Y2}`];


            keys.forEach(key => {
                if (!base[key]) { base[key] = [collider] }
                else {
                    base[key].push(collider)
                }
            });

            // Check for existing collisions
            if (false) {
                let existingCollider = keys.map(key => base[key]).find(c => c);
                if (!existingCollider) {
                    // No collision; occupy cells
                    keys.forEach(key => base[key] = [collider]);
                } else {

                    let coll = [];


                    if (base[keys[0]]) {
                        coll.push(base[keys[0]]);
                    }
                    if (base[keys[1]]) {
                        coll.push(base[keys[1]]);
                    }
                    if (base[keys[2]]) {
                        coll.push(base[keys[2]]);
                    }
                    if (base[keys[3]]) {
                        coll.push(base[keys[3]]);
                    }
                    coll.push(collider);
                    keys.forEach(key => base[key] = collider);
                    collisions.push(coll)

                }
            }
        }
        // Process collisions
        for (k in base) {
            if (base[k].length > 1) {
                for (let j = 0; j < base[k].length; j++) {
                    for (let i = 0; i < base[k].length; i++) {
                        SEE_L(base[k][i].pos, base[k][j].pos, "rgba(3, 250, 217, 0.09)")
                    }
                }
            }
        }
    }
    function mainLoop() {
        frameCount++;
        MovePlayer();
        /////// object creation
        REPOS.forEach(b => {
            b.pos_o = new Vec(b.pos.x, b.pos.y);
            b.vel = b.vel.mult(b.frict) //.rotate(-0.5+Math.random());
            b.pos = b.pos.add(b.vel);
        });
        ///////////////// kills management
        for (let i = 0; i < KILLABLE.length; i++) {
            const k = KILLABLE[i];
            k.age++
            if (k.age > k.maxage || !(k.hp > 0) || k.died_time) {
                k.DIE()
            }
        }
        ///////////////// drawing
        Camera();
        THE_PLAYER.rotation = Get_rotation(mousePos.x, mousePos.y, THE_PLAYER)
        object_based_grild_collision_detection_test4()
        if (true) {
            for (let i = DRW_1.length - 1; i > -1; i -= 1) {
                DRW_1[i].drw_1()
            }
            for (let i = DRW_2.length - 1; i > -1; i -= 1) {
                DRW_2[i].drw_2()
            }
            for (let i = DRW_3.length - 1; i > -1; i -= 1) {
                DRW_3[i].drw_3()
            }
        }
        //////////// Last functions
        for (let i = 0; i < DELETED.length; i++) {
            DELETED[i] == null
            DELETE(DELETED[i])
        }
        DELETED.splice(0, DELETED.length)
        rtr0dmg.clear();
        /// visualization for thing 
        SEE_X.forEach(b => {
            let S = Math.random()
            if (b.c) {
                drawStar(b.x, b.y, 9, 3 / camera.zoom * S, 2 / camera.zoom * S, b.c, b.c);
                return new Vec(b.x, b.y)
            }


            drawStar(b.x, b.y, 9, 3 / camera.zoom * S, 2 / camera.zoom * S, getRandomColor() + 92, getRandomColor() + 91)
            return new Vec(b.x, b.y)
        });
        SEE_Lv.forEach(v => {
            ctx.beginPath();
            ctx.moveTo(v.b.x, v.b.y); //v is start pos
            ctx.lineTo(v.a.x, v.a.y);
            ctx.strokeStyle = v.c;
            ctx.lineWidth = 1
            ctx.stroke();
            ctx.closePath();
        });
        SEE_X = [];
        SEE_Lv = [];
        requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop)
    //requestAnimationFrame(mainLoop);
    COLLI_G.forEach((g) => {
        g.repos();
        // b.calculate_group_velocity()
        ctx.beginPath();
        ctx.arc(g.pos.x, g.pos.y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = getRandomColor();
        ctx.fill();
        ctx.closePath();
    })
    ///////////////////// AI
    if (maxagents > 0) {
        AGENTS.sort((a, b) => -a.fit + b.fit);
        if (AGENTS.length < maxagents / 12) {
            for (let i = 0; i < maxagents / 2; i++)
                console.log("newone")
            let NA = new Agent();
            for (let i = 0; i < 616; i++) {
                NA.mutate()
            }
        }
        for (let index = maxagents; index < AGENTS.length; index++) {

            AGENTS[index].maxage = -1
            AGENTS.splice(index, 1)
        }
        AGENTS.forEach(ag => {
            if (ag.age >= 0) {
                if (ag.age > 300) { ag.act(); ag.age = 0 }
                ag.age += 10 + Math.random()
            }
            evaluate(ag)
            if (ag.hp < ag.maxhp) {
                ag.hp += 1
            }
        });
        AGENTS.forEach(ag => {
            if (Math.random() < 0.01) {
                if (ag.hp < 17) { return }
                ag.fit *= 0.9
                let co = ag.copy()
                co.mutate()
            }
        });
    }
}
