
function comb_func(...fns) {
    return function combined() {
        for (const fn of fns) {
            fn.call(this); // Ensure `this` context is preserved // fn.call(this)
        }
    };
}
F_regen = function () {
    if (this.hp < this.old_hp) { this.rg_wait = 0 }
    this.hp = Math.min(this.maxhp,
        this.hp + this.regen + this.regen * this.rg_wait / 128
    )
    this.rg_wait++
    this.old_hp = this.hp
}
F_regen_o = function () {
    if (this.owner.hp < this.owner.old_hp) { this.owner.rg_wait = 0 }
    this.owner.hp = Math.min(this.owner.maxhp,
        this.owner.hp + this.owner.regen + this.owner.regen * this.owner.rg_wait / 128
    )
    this.owner.rg_wait++
    this.owner.old_hp = this.owner.hp
}
class hp_regen {
    constructor(owner, regen = 0.05) {


        owner.regen = regen
        this.old_hp = Infinity
        this.rg_wait = 999

        this.owner = owner
        this.arrays = [this.owner.child, ACT]
        this.DIE = DIE_0
        this.arrays.forEach((arr) => arr.push(this));
    }
    act() {
        if (this.owner.hp < this.old_hp) { this.rg_wait = 0 }
        this.owner.hp = Math.min(this.owner.maxhp,
            this.owner.hp + this.owner.regen + this.owner.regen * this.rg_wait / 128
        )
        this.rg_wait++

        this.old_hp = this.owner.hp
    }
}
function F_act_setup_growth(NB, spead = 0.01) {
    NB.f_og = {
        act: NB.act,
        r: NB.r,
        hp: NB.hp,
        maxhp: NB.maxhp,
        ratio_g: spead / (NB.r ** 0.7),
        NO_act: false,
    }
    NB.r = NB.r * spead
    NB.hp = NB.hp * spead
    NB.maxhp = NB.maxhp * spead

    if (!(ACT.indexOf(NB) > -1)) {
        NB.f_og.NO_act = true
        NB.arrays.push(ACT)
        ACT.push(NB)
    }

    console.log(NB)
    NB.act = function () {
        this.r += this.f_og.r * this.f_og.ratio_g
        this.hp += this.f_og.hp * this.f_og.ratio_g
        this.maxhp += this.f_og.maxhp * this.f_og.ratio_g
        if (this.r > this.f_og.r) {
            this.r = this.f_og.r
            this.maxhp = this.f_og.maxhp
            this.act = this.f_og.act

            if (this.f_og.NO_act) {
                let j = ACT.indexOf(this)
                if (j > -1) { ACT.splice(j, 1) }

                let i = this.arrays.indexOf(ACT)
                if (i > -1) { this.arrays.splice(i, 1) }
            }

            this.f_og = undefined;
            delete this.f_og;
        }
    }
}






const R_NAMES = [
    "test",
    ":D",
    ":3",
    "DKKKKKOS",
    "Podjf",
    "eerr",
    "ggf",
    "pet",
]
let NAMES_X = [
    'UwU', 'cute', 'pet', 'lil', ':D', 'OwO', 'D:', ':3', 'XD',
    'super',
    'enjoyer', 'kick',
    'enemy', 'killer', 'destroyer',
    "💀",

    'racist', 'adolf',
    'fuhrer', 'genocide', 'hitler', 'holocaust', 'jaws',
    'mussolini',
    '卐', '卐卐卐',

    'nazis', 'nazi', 'nigga', 'niggas', 'nigger',
    'segregation', 'slavery', 'slave',
    'stalin', 'supremacist',
    'communist', 'fag',
    'fascist',


    'down', 'drugs', 'drunk', 'fart', 'foot',
    'pee', 'poop',
    'mega', 'real', 'methamphetamine',
    'superiority',
    'amongus', 'based', 'brain',
    'butt', 'child', 'clown', 'cocaine',
    'sigma', 'skibidy',
    'sus', 'toilet', 'torture', 'trump',
    'yeet', 'zaza', 'diarrhea', 'goofy', 'ahh', 'addiction',


    'hot',
    'abuse', 'abuser',
    'porn', 'prostitute', 'rape', 'raper', 'pedo', 'pedophile', 'pedophilia',
    'lick', 'licker', 'testicle',
    'ass', 'balls',
    'cook', 'cum', 'dick', 'edgy', 'fuck', 'fucker', 'molest', 'molester', 'gay',
    'cummer',
    'nude', 'onlyfans',
    'vagina', 'penis', 'blowjob', 'boobs',
    'anal', 'hentai',
]
let CHAT_X = [
    'EZ',
    'EZZ',
    'ezz',
    'ez',
    'easy',
    'noob',
    'dog',
    'lll dog',
    'LLL!!',
    'bad',
    'loser lll',
    'nigga',
    'ass',
    'die nigger',
    'die fag',
    'HAHAHA fag',
    'looser!',
    'AHAH die',
    'L deserved.',
    'LLL',
    'L',
    'LL',
        'l',
            'lll',
                'lll',
]
let CHAT_R_X = [
    'go away',
    'shut up nigger',
    'idiot',
    'SO MANY FAGS!',
    'noob',
    'bot',
    'soo bad',
    'annoyng',
    'look a nigger',
    'look a gay',
    'come here fag',
]

let NAMES_arras = [
    "Kami [KPK]",
    "Suntmareha",
    "///[Rey]///",
    "Jokes on You",
    "🍕PIZZA🍕(◕‿◕)",
    "⦕↭⦖[vn][base][IPЯ][ADG][A-ADG][KPK]☬[𝐒𝐆]☬[⨊][GOD]『𝟛𝕯』[c]『☾』[1st][Pol]",
    "☬[𝐒𝐆]☬",
    "Faraj",
    "Dread Ego[IPЯ]",
    "AC-130👑 『𝟛𝕯』",
    "[IPЯ] Wilson (someone)",
    "Mr.Smith",
    "fat american boy",
    "nutcnuts⦕↭⦖",
    "QUEEN",
    "Detush",
    "souxie",
    "Japanese Soilder in 1945",
    "The Arras Police[pol]",
    "<>",
    "yellow",
    "Eli_M 🤍",
    "12345 tttbibi 👑",
    "[ΩΨ] Droid ɹ≠ɯ",
    "Z 🏴  zpl",
    "Peace☮War☢︎",
    "𝕄𝕖𝕘𝕦𝕞𝕒",
    "zaq",
    "Smasher Pet (69 left)",
    "helix",
    "zyzy",
    "-_-",
    "ℂ𝕣𝒶𝓏𝓎 ꌗꈤค¢k🤣",
    "🌹 Naomi",
    "ssfv344",
    "just an arras player",
    "Roket engine",
    "[][][][][][]",
    "Wendy",
    "aphro",
    "shovel",
    "wather [canada]",
    "foreverblue",
    "Suis",
    "lampadar",
    "[IPЯ] Shin",
    "nobody Macro",
    "Overseer",
    "Mr Haker",
        "Corrupt X",
]

F_get_randomname = function (NAM = NAMES_X) {

    return NAMES_arras[Math.trunc(Math.random() * NAMES_arras.length)]

    function ger_randomnume() { return Math.trunc(Math.random() * NAM.length) }

    let first = NAM[ger_randomnume()] //1
    let more = (Math.random() ** 2) + (1 - (Math.random() ** 2))
    for (let i = 0; i < Math.round(more); i++) {
        first = first + ' ' + NAM[ger_randomnume()]
    }
    return first

    return R_NAMES[Math.trunc(Math.random() * R_NAMES.length)]
};






F_randommove = function () {
    this.vel._rotate(0.05 * Math.cos(this.age / 223) * Math.random());
    this.vel.x += (Math.random() - 0.5) * Math.cos(this.age / 123) * Math.random() * 12;
    this.vel.y += (Math.random() - 0.5) * Math.sin(this.age / 153) * Math.random() * 12;
    this.rotation += 1 / gaussianRandom(12, 0.8) * (Math.cos(this.age / (173 + this.vel.x * 12)) * Math.random());
};
F_turret_rot = function () {
    let crot = this.owner.pos.sub(mousePos);
    let target = Math.atan2(-crot.y, -crot.x)

    let max = this.rel_rot_max + this.owner.rotation
    let min = this.rel_rot_min + this.owner.rotation

    shortest_angle = ((((target - this.rel_rot) % P2) + Math.PI * 3) % P2) - Math.PI;
    this.rel_rot += shortest_angle * 0.02;



    this.bl_st.rel_rot = this.rel_rot
}





F_go_to_point_ai = function () {
    SEE_L(this.pos, this.target.pos, 'green')
    let direction = this.target.pos.sub(this.pos)
    let mult = direction.magSq()
    let dist = 1 / Math.sqrt(mult)
    direction._mult(dist)
    direction._mult(this.spead)
    this.vel._add(direction)
    return dist
};
F_rotate_to_point_ai = function () {
    let crot = this.target.pos.sub(this.pos);
    this.rotation = Math.atan2(crot.y, crot.x);
};
F_get_target_ai = function () {
    if (this.age % 24 !== 0) return
    let in_Rage = [];
    const cands = rtr0dmg.search(nullMBR(this.owner.pos, this.owner.r + 1113));
    cands.forEach(cand => {
        if (//cand.object !== this &&
            cand.object.rank <= this.rank &&
            cand.object.team !== this.team &&
            cand.object.hp
        ) {
            in_Rage.push(cand.object)
        }
    });
    if (in_Rage.length == 0) { this.target.pos = this.def_target.pos; return }
    in_Rage.sort((a, b) => (a.pos.distSq(this.owner.pos) + a.r ** 2) - (b.pos.distSq(this.owner.pos) + b.r ** 2))
    this.target.pos = in_Rage[0].pos
    this.target.hp = in_Rage[0].hp
    this.target.vel = in_Rage[0].vel
    SEE_L(this.owner.pos, this.target.pos)

};
class cl_AI {
    constructor(owner, gun) {

        this.owner = owner
        if (!this.owner.mouse) this.owner.mouse = { x: this.owner.pos.x, y: this.owner.pos.x }
        this.fov = 500
        this.combact_range = 500
        this.arrays = [ACT, this.owner.child]
        this.owner.child.push(this)
        ACT.push(this)
        this.time = Math.floor(Math.random() * 24)
        this.time_max = 24

        this.random_c = 0

        this.target = {
            pos: this.owner.pos,
            pos_o: this.owner.pos,
            vel: new Vec(0, 0),
            r: 0,
            dmghp: 1
            , rank: 0
        }
        this.DIE = DIE_0
        this.obsta = {
            pos: this.owner.pos,
            pos_o: this.owner.pos,
            vel: new Vec(0, 0),
            r: 0,
            dmghp: 1
            , rank: 0
        }
        this.home = {
            pos: this.owner.pos,
            pos0: this.owner.pos,
            size: this.fov * 4,
            bias: new Vec(0, 0),
            stuck_time: 0
        }
        this.blt = {
            vel: gun.bl_st.ran_vel + gun.bl_st.rel_vel,

            frict: gun.bl_st.frict,

            maxage: gun.bl_st.maxage
        }

    }
    act() {
        this.time++
        let in_Rage = [];
        let Obstacles = [];
        const cands = rtr0dmg.search(nullMBR(this.owner.pos, this.owner.r + this.fov));
        cands.forEach(cand => {
            if (
                cand.object.team !== this.owner.team
            ) {
                if (cand.object.rank <= this.owner.rank && cand.object.hp > 0) { in_Rage.push(cand.object) } else { Obstacles.push(cand.object) }
            }
        });


        if (Obstacles.length > 0) {
            Obstacles.sort((a, b) => (a.pos.distSq(this.owner.pos) + a.r ** 2) - (b.pos.distSq(this.owner.pos) + b.r ** 2))
            this.obsta.pos = Obstacles[0].pos
            this.obsta.pos_o = Obstacles[0].pos_o ?? Obstacles[0].pos
            this.obsta.dmghp = Obstacles[0].hp * Obstacles[0].dmg
            this.obsta.vel = Obstacles[0].vel
            this.obsta.rank = Obstacles[0].rank
            this.obsta.r = Obstacles[0].r
        } else {
            this.obsta.dmghp = -1 // act like obstacle is death "kill current obstacle"
        }

        if (in_Rage.length > 0) {
            in_Rage.sort((a, b) => (a.pos.distSq(this.owner.pos) + a.r ** 2) - (b.pos.distSq(this.owner.pos) + b.r ** 2))
            this.target.pos = in_Rage[0].pos
            this.target.pos_o = in_Rage[0].pos_o ?? in_Rage[0].pos
            this.target.dmghp = in_Rage[0].hp * in_Rage[0].dmg
            this.target.vel = in_Rage[0].vel
            this.target.rank = in_Rage[0].rank
            this.target.r = in_Rage[0].r
        } else if (this.obsta.dmghp > 0) {
            this.target.pos = this.obsta.pos
            this.target.pos_o = this.obsta.pos_o
            this.target.dmghp = this.obsta.dmghp
            this.target.vel = this.obsta.vel
            this.target.r = this.obsta.r
            this.target.rank = this.obsta.rank // make the obstacle becoming an actual target (ramming it)
        } else { // no alive obstacle or targets in range

            if (
                Math.abs(this.owner.pos.x - this.owner.pos_o.x) < this.owner.spead / 4 ||
                Math.abs(this.owner.pos.y - this.owner.pos_o.y) < this.owner.spead / 4
            ) {
                this.home.stuck_time++

                if (this.home.stuck_time > 20) {
                    let dist = this.home.pos.dist(this.owner.pos) * 12

                    this.home.bias = new Vec((Math.random() - 0.5) * dist, (Math.random() - 0.5) * dist)
                } else {
                    this.home.bias = new Vec((Math.random() - 0.5) * this.home.size, (Math.random() - 0.5) * this.home.size)
                }
                this.home.pos0 = this.home.pos.add(this.home.bias)
            } else {
                this.home.stuck_time = Math.min(this.home.stuck_time - 0.01, 0)
            }


            this.target.pos = this.home.pos0
            this.target.pos_o = this.home.pos0
            this.target.vel = new Vec(0, 0)
            this.target.r = 0
            this.target.dmghp = 0
            this.target.rank = this.owner.rank
        }


        if (this.target.dmghp > 0) {
            this.owner.mouse.shoot++
        } else {
            this.owner.mouse.shoot = 0
        }

        this.AI()
        this.time = 0


    }
    AI() {

        let this_pos = this.owner.pos.add(this.owner.vel.mult(this.owner.frict))
        let dist = this.target.pos.dist(this_pos)

        let old_v = new Vec(-this.target.pos_o.x + this.target.pos.x, -this.target.pos_o.y + this.target.pos.y)
        let accel = this.target.vel.mag() / old_v.mag()
        if (!isFinite(accel)) accel = 1


        let d1 = this.owner.pos.sub(this.target.pos).unit(); // Direction of Line 1
        let d2 = this.target.vel.unit(); // Direction of Line 2
        let rel_dir = d1.dist(d2)

        let time = (dist / this.blt.vel) * (1 / (this.blt.frict))
        let futurepos = this.target.pos.add(this.target.vel.mult(time * rel_dir * accel))


        let crot = futurepos.sub(this_pos)
        let rot1 = Math.atan2(crot.y, crot.x);
        this.owner.rotation = rot1


        this.random_c += 0.3 * Math.random() ** 12
        this.random_c = this.random_c % 4
        let sign = this.random_c > 2 ? 1 : -1
        let doge = (Math.abs(this.random_c - 2) / 4 + 0.5) * sign


        let run
        let far
        let survive = (this.owner.hp / this.owner.maxhp) < 0.2

        if (this.target.dmghp > 0) {
            // gradual ram if you have more healt, but avoid if you healt percentage is low
            run = survive ? 1 : Math.min(Math.max((-this.owner.hp * this.owner.dmg * (this.owner.hp / this.owner.maxhp) + this.target.dmghp), 0), 1)
        } else {
            // not ram death
            run = 1
        }


        if (this.target.rank > this.owner.rank) {
            // attack bullet from close when there are no enemy
            far = Math.min(Math.max(0.25 * this.fov / (dist + this.target.r + this.owner.r), 0), 1) * doge; run = 1
        } else {
            // stay at safe distance from enemy if is not conevient to ram
            let mode = survive ? this.fov : this.combact_range // se la percentuale di hp è bassa usa tutto il fov per ritirartio
            far = Math.min(Math.max(mode / (dist + this.target.r + this.owner.r), 0), 1) * doge
            if (survive) { far = 0.7 * Math.sign(far) + far * 0.3 }
        }

        //far = Math.round(far)
        //run = Math.round(run)


        let new_vel = new Vec(this.owner.spead, 0)

        //SEE_L(this_pos,this.target.pos,'rgba(0, 255, 0, 0.1)')
        let obst_dist = this.obsta.pos.dist(this_pos)
        if (this.obsta.dmghp > 0 && obst_dist * 2.5 < dist + this.target.r + this.owner.r && !survive) {

            let futurepos2 = this.obsta.pos.add(this.obsta.vel.unit().mult(obst_dist))
            let cro = futurepos2.sub(this_pos)
            let rot2 = Math.atan2(cro.y, cro.x);

            new_vel._rotate(rot2 + Math.PI)
            //SEE_L(this_pos,this.obsta.pos,'rgb(255, 0, 0)')

            this.owner.mouse.x = cro.x
            this.owner.mouse.y = cro.y
        } else {
            this.owner.mouse.x = crot.x
            this.owner.mouse.y = crot.y
            //SEE_L(this_pos,this.obsta.pos,'#0002')
            new_vel._rotate(this.owner.rotation + Math.PI * run * far) // run/attack target
        }


        this.owner.vel._add(new_vel)
    }
}











///////////////////// drawing



function F_drawStar_void() {
    let rotspeed = ((frameCount % this.rot_speed) / this.rot_speed) * P2;   // Rotation speed for the star
    let spikes = this.spikes;             // Number of star spikes
    let rot = Math.PI / 2 + rotspeed;     // Initial rotation angle with speed
    let step = Math.PI / spikes;          // Angle step between each spike
    // Circle and star radii
    let cirlce_r = this.owner.r * this.r0;
    let points1 = this.owner.r * this.r1;       //circle radius
    let points2 = this.owner.r * this.r2;
    // Draw outer circle
    // Start a new path for the transparent star cut-out
    ctx.beginPath();
    // Move to the first point on the outer radius
    ctx.arc(this.owner.pos.x, this.owner.pos.y, cirlce_r, rotspeed - 0.0001, P2 + rotspeed, true);
    x = this.owner.pos.x + Math.cos(rot) * points2;
    y = this.owner.pos.y + Math.sin(rot) * points2;
    ctx.lineTo(x, y);
    rot += step;
    // Draw the star path
    for (let i = 0; i < spikes; i++) {
        // Outer point
        x = this.owner.pos.x + Math.cos(rot) * points1;
        y = this.owner.pos.y + Math.sin(rot) * points1;
        ctx.lineTo(x, y);
        rot += step;
        // Inner point
        x = this.owner.pos.x + Math.cos(rot) * points2;
        y = this.owner.pos.y + Math.sin(rot) * points2;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.fillStyle = this.color;           // Circle fill color
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    for (let i = 0; i < spikes; i++) {
        // Outer point
        x = this.owner.pos.x + Math.cos(rot) * points1;
        y = this.owner.pos.y + Math.sin(rot) * points1;
        ctx.lineTo(x, y);
        rot += step;
        // Inner point
        x = this.owner.pos.x + Math.cos(rot) * points2;
        y = this.owner.pos.y + Math.sin(rot) * points2;
        ctx.lineTo(x, y);
        rot += step;
    }
    x = this.owner.pos.x + Math.cos(rot) * points1;
    y = this.owner.pos.y + Math.sin(rot) * points1;
    ctx.lineTo(x, y);
    rot += step;
    ctx.strokeStyle = this.bor_col;
    ctx.lineWidth = this.owner.bor_s;
    ctx.strokeStyle = this.bor_col;
    ctx.stroke();
    ctx.closePath();
    // Draw the border for the outer circle 
    ctx.lineWidth = this.owner.bor_s;
    ctx.strokeStyle = this.bor_col;
    ctx.beginPath();
    ctx.arc(this.owner.pos.x, this.owner.pos.y, cirlce_r, 0, P2, true);
    ctx.stroke();
    ctx.closePath();

}

function F_draw_child() {
    this.child.forEach((c) => { c.drw_2() })
}

function F_draw_HP() {
    let inv_per = ((this.maxhp - this.hp) / this.maxhp)
    if (inv_per > 0 && this.age > 0) {
        let per = 1 - inv_per

        let halfp = 1 - (((per))) ** 5

        let perc = per * P2
        let C = (this.age / 331)
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r * (0.75), 0, P2);
        ctx.strokeStyle = rgba(0, 0, 0, 1 * halfp * 0.6);
        ctx.lineWidth = this.r * 0.25 * halfp
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r * (0.75), 0.0001 + C, perc + C);
        ctx.strokeStyle = rgba(255, 255, 255, 1 * halfp * 0.6);
        ctx.lineWidth = this.r * 0.2 * halfp
        ctx.stroke();
        ctx.closePath();
    }
}

/////////// owner helping function

function F_o_auraDmg() {
    const cands = rtr0dmg.search(nullMBR(this.owner.pos, this.size + this.owner.r));
    cands.forEach(cand => {
        if (cand.object.team == this.owner.team ?? cand.object.rank > this.owner.rank) return
        if ((cand.object.r + this.owner.r + this.size) ** 2 < cand.object.pos.distSq(this.owner.pos)) return
        if (Math.pow(cand.object.r + this.owner.r + this.size, 2) > Math.pow(this.owner.pos.x - cand.object.pos.x, 2) + Math.pow(this.owner.pos.y - cand.object.pos.y, 2)) { }
        cand.object.hp -= this.dmg
    });
}
function F_o_auraDmg0() {
    const cands = rtr0dmg.search(nullMBR(this.owner.pos, this.size + this.owner.r));
    cands.forEach(cand => {
        if (cand.object.team == this.owner.team ?? cand.object.rank > this.owner.rank) return
        if ((cand.object.r + this.owner.r + this.size) ** 2 < cand.object.pos.distSq(this.owner.pos)) return
        if (Math.pow(cand.object.r + this.owner.r + this.size, 2) > Math.pow(this.owner.pos.x - cand.object.pos.x, 2) + Math.pow(this.owner.pos.y - cand.object.pos.y, 2)) { }
        cand.object.hp -= this.dmg
    });
}
function F_o_auraDraw0() {
    ctx.beginPath();
    const grad = ctx.createRadialGradient(this.owner.pos.x, this.owner.pos.y, this.owner.r, this.owner.pos.x, this.owner.pos.y, this.owner.r + this.size * 1.8)
    grad.addColorStop(0, this.color);
    grad.addColorStop(1, this.bor_col);
    ctx.fillStyle = grad
    ctx.lineWidth = this.owner.bor_s;
    ctx.strokeStyle = this.bor_col;
    ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r + this.size, 0, P2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function F_o_auraDraw1() {
    ctx.beginPath();
    const grad = ctx.createRadialGradient(this.owner.pos.x, this.owner.pos.y, this.owner.r, this.owner.pos.x, this.owner.pos.y, this.owner.r + this.size)
    grad.addColorStop(0, this.bor_col);
    grad.addColorStop(0.9, this.color);
    ctx.fillStyle = grad
    ctx.lineWidth = this.owner.bor_s;
    ctx.strokeStyle = this.color;
    ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r + this.size, 0, P2, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
function F_o_Shoot2() {
    this.charge = Math.min(this.charge + this.reload, this.bl_sn)

    if (0 >= this.owner.mouse.shoot || this.charge < this.bl_n) return;

    let vel0 = new Vec(this.recoil * (this.owner.frict - 1), 0)
    vel0._rotate(this.owner.rotation + this.rel_rot)
    this.owner.vel._add(vel0)

    let amount = this.charge
    while (this.charge >= 1) {
        this.charge--
        new Bullet_class(this.owner, this.bl_st);
    }
}

////////////////////////// generate 



const bulletSpawn = {
    default: function () {
        let vel2 = new Vec(this.rel_vel + this.ran_vel * Math.random(), 0)
        vel2._rotate(this.owner.rotation + this.rel_rot + (Math.random() - 0.5) * this.ran_rot)
        this.vel = vel2.add(this.owner.vel.mult(this.owner.frict))

        let pos2 = new Vec(this.owner.r + this.rel_dis * this.owner.r, 0)
        this.pos = this.owner.pos.add(pos2.rotate(this.owner.rotation + this.rel_rot))
        this.pos_o = this.owner.pos
    },
    default_c_act: function (act) {
        let vel2 = new Vec(this.rel_vel + this.ran_vel * Math.random(), 0)
        vel2._rotate(this.owner.rotation + this.rel_rot + (Math.random() - 0.5) * this.ran_rot)
        this.vel = vel2.add(this.owner.vel.mult(this.owner.frict))

        let pos2 = new Vec(this.owner.r + this.rel_dis * this.owner.r, 0)
        this.pos = this.owner.pos.add(pos2.rotate(this.owner.rotation + this.rel_rot))
        this.pos_o = this.owner.pos
        this.act = act
        this.arrays.push(ACT)
        ACT.push(this)
    },
    turret: function () {
        let vel1 = this.owner.vel.mult(this.owner.frict)
        let vel2 = new Vec(this.rel_vel + this.ran_vel * Math.random(), 0)

        vel2._rotate(this.rel_rot + (Math.random() - 0.5) * this.ran_rot)
        this.vel = vel2.add(vel1)
        let pos2 = new Vec(this.owner.r + this.rel_dis * this.owner.r, 0)
        this.pos = this.owner.pos.add(pos2.rotate(this.rel_rot))
        this.pos_o = this.owner.pos
    },
    turret_trasled: function () {
        let vel1 = this.owner.vel.mult(this.owner.frict)
        let vel2 = new Vec(this.rel_vel + this.ran_vel * Math.random(), 0)
        vel2._rotate(this.rel_rot + (Math.random() - 0.5) * this.ran_rot)
        this.vel = vel2.add(vel1)

        let pos2 = new Vec(this.rel_dis * this.owner.r, 0)

        //owner this tueert pos add
        this.pos = this.owner.pos.add(pos2.rotate(this.rel_rot))
        this.pos_o = this.owner.pos
    }
};
class Bullet_class {
    constructor(owner, bl_st = {}) {
        this.owner = owner;
        this.rank = owner.rank + 3;
        this.team = owner.team;

        // Child objects
        this.child = [];

        this.a0 = true // start colliding

        // Stats with defaults
        this.r = bl_st.r * owner.r;  //i ned to remove this
        this.frict = bl_st.frict;
        this.m = bl_st.m;
        this.inv_m = bl_st.inv_m;
        this.hard = bl_st.hard;
        this.elast = bl_st.elast;
        this.slide = bl_st.slide;
        this.stk = bl_st.stk;

        this.age = 0;
        this.maxage = bl_st.maxage;
        this.hp = bl_st.hp;
        this.maxhp = bl_st.maxhp;
        this.dmg = bl_st.dmg;

        // Positional stats
        this.ran_rot = bl_st.ran_rot;
        this.ran_vel = bl_st.ran_vel;
        this.rel_rot = bl_st.rel_rot;
        this.rel_dis = bl_st.rel_dis;
        this.rel_vel = bl_st.rel_vel;
        this.relat = bl_st.relat

        // Visual properties
        this.color = bl_st.color.clone();
        this.bor_col = bl_st.bor_col.clone();
        Get_bor_s(this)

        // Spawn commands
        this.arrays = bl_st.arrays;
        this.DIE = DIE_2
        this.DIE_anim = DIE_anim01
        this.arrays.forEach((arr) => arr.push(this));


        // Assign customizable behaviors
        //Object.assign(this, b_spawn);
        this.b_spawn = bl_st.b_spawn ?? bulletSpawn.default
        this.b_spawn();

        if (bl_st.b_spawn) {
            this.b_spawn = bl_st.b_spawn
            if (bl_st.b_spawn_stats) {
                this.b_spawn = bl_st.b_spawn_stats
            }
        } else {
            this.b_spawn = bulletSpawn.default
        }
        this.b_spawn()
    }

    // Default behavior methods

    drw_2() {
        drawBl01(this);
    }
}
let gunstats = {


}
class gun0 {
    constructor(owner, bl_st = {}, gun_st = {}) {


        let bl_vel = bl_st.rel_vel ?? 21.2
        let bl_ran_vel = bl_st.ran_vel ?? 4
        let bl_ran_rot = bl_st.ran_rot ?? 0.2

        this.owner = owner
        this.rel_rot = bl_st.rel_rot ?? Math.PI
        let c = this.owner.color.sat(-0.7)
        let b_c = this.owner.bor_col.sat(-0.8)
        this.color = c.c
        this.bor_col = b_c.c
        this.bor_s = this.owner.bor_s
        ///shooting
        this.recoil = gun_st.recoil ?? -12
        this.reload = gun_st.reload ?? 0.001
        this.bl_n = gun_st.bl_n ?? 1
        this.bl_sn = gun_st.bl_sn ?? this.bl_n
        this.charge = this.bl_sn


        this.bl_st = {
            frict: bl_st.frict,
            r: bl_st.r,
            m: bl_st.m,
            inv_m: bl_st.inv_m,
            hard: bl_st.hard,
            elast: bl_st.elast,
            slide: bl_st.slide,
            stk: bl_st.stk,
            maxage: bl_st.maxage,
            hp: bl_st.hp,
            maxhp: bl_st.hp,
            dmg: bl_st.dmg,
            arrays: bl_st.arrays,
            ran_rot: bl_ran_rot,
            ran_vel: bl_ran_vel,
            rel_rot: this.rel_rot,
            rel_dis: bl_vel / 12,
            rel_vel: bl_vel,
            relat: gun_st.relat ?? {
                bou: 1,//0 = don't do //1 = do //-1 = don't do even if other do 2= do even if other is -1
                ing: 0,// on equal ranks es: 2  other minion 
                bou_0: 1,
                ing_0: 1,// on superior ranks es: 1 players
                bou_1: 1,
                ing_1: 0,// on inferior ranks es: 3 bullets    // cannot ingore differents team}
            },
            color: bl_st.color ?? this.owner.color,
            bor_col: bl_st.bor_col ?? this.owner.bor_col
        }


        if (gun_st.internal_setup) {
            this.internal_setup = gun_st.internal_setup
            if (gun_st.setup_stats) {
                this.setup_stats = gun_st.setup_stats
            }
        } else {
            this.internal_setup = gun_0_setup
        }
        this.internal_setup()



        this.DIE = DIE_2
        this.DIE_anim = DIE_anim0
        this.arrays.forEach((arr) => arr.push(this));
    }
}


function wp_draw0() {
    if (this.og_ow_r != this.owner.r) { this.draw_update() }
    ctx.save(); // Save the current context
    ctx.translate(this.owner.pos.x, this.owner.pos.y);
    ctx.rotate(this.owner.rotation + this.rel_rot);
    ctx.beginPath();
    ctx.arc(0, 0, this.owner.r, -this.basesize, this.basesize);
    ctx.lineTo(this.disance1, this.width);
    ctx.lineTo(this.disance1, -this.width);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = this.owner.bor_s;
    ctx.strokeStyle = this.bor_col;
    ctx.stroke();
    ctx.beginPath();


    ctx.lineTo(this.disance1-this.width, this.width);
    ctx.lineTo(this.disance1-this.width+this.deco_lenght*this.curve_x, this.width+this.deco_lenght*this.curve_y);

    ctx.lineTo(this.disance1-this.width/2, 0);

    ctx.lineTo(this.disance1-this.width+this.deco_lenght*this.curve_x, -this.width-this.deco_lenght*this.curve_y);
    ctx.lineTo(this.disance1-this.width, -this.width);


    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = this.owner.bor_s;
    ctx.strokeStyle = this.bor_col;
    ctx.stroke();
    ctx.restore(); // Restore the context to avoid affecting other drawings
}
function wp_draw1() {
    if (this.og_ow_r != this.owner.r) { this.draw_update() }
    ctx.save(); // Save the current context
    ctx.translate(this.owner.pos.x, this.owner.pos.y);
    ctx.rotate(this.owner.rotation + this.rel_rot);
    ctx.beginPath();
    ctx.arc(0, 0, this.owner.r, -this.basesize, this.basesize);
    ctx.lineTo(this.disance1, this.width);
    ctx.lineTo(this.disance1, -this.width);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = this.owner.bor_s;
    ctx.strokeStyle = this.bor_col;
    ctx.stroke();
    ctx.beginPath();
    ctx.lineTo(this.disance1, this.width);
    ctx.lineTo(this.disance1, -this.width);
    ctx.lineTo(this.disance2, -this.width2);
    ctx.lineTo(this.disance2, this.width2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = this.owner.bor_s;
    ctx.strokeStyle = this.bor_col;
    ctx.stroke();
    ctx.restore(); // Restore the context to avoid affecting other drawings
}
function gun_0_setup() {
    this.disance1 = this.owner.r + this.owner.r * (this.bl_st.rel_vel / 12) //* ((Main/2-Math.abs(i2))/2+1)

    this.curve_x = Math.cos(this.bl_st.ran_rot/2)
    this.curve_y = Math.sin(this.bl_st.ran_rot/2)

    this.width = this.owner.r * this.bl_st.r
    this.deco_lenght = this.width*(0.5+this.bl_st.ran_vel / 12)

    this.basesize = Math.min(Math.PI / 2, this.bl_st.r)
    this.drw_2 = wp_draw0
    this.og_ow_r = this.owner.r
    this.draw_update = function () {
        let newR = this.owner.r / this.og_ow_r
        this.width *= newR
        this.disance1 *= newR
        this.deco_lenght *= newR
        this.og_ow_r = this.owner.r
    }
    //////////// shooting:
    this.act1 = comb_func(F_o_Shoot2)
    this.arrays = [this.owner.child, ACT1, DRW_2]
}
//gun_1_setup = twin like guns
function gun_0t_setup() {
    this.bl_st.b_spawn = bulletSpawn.turret

    let rel_rot_max = this.setup_stats.rel_rot_max ?? Infinity
    this.rel_rot_max = this.rel_rot + rel_rot_max / 2
    this.rel_rot_min = this.rel_rot - rel_rot_max / 2

    this.bl_st.rel_dis -= (1 - this.setup_stats.r)

    //draw
    this.r = this.owner.r * this.setup_stats.r
    this.disance1 = this.r + this.owner.r * (this.bl_st.rel_vel / 30) //* ((Main/2-Math.abs(i2))/2+1)
    this.disance2 = this.disance1 + this.owner.r * (this.bl_st.ran_vel / 60)
    this.width = this.owner.r * this.bl_st.r
    this.width2 = this.width + this.bl_st.ran_rot * (this.bl_st.ran_vel / 60) * this.owner.r  // spread
    this.basesize = Math.min(Math.PI / 2, this.bl_st.r * (1 / this.setup_stats.r))

    this.drw_2 = function () {
        if (this.og_ow_r != this.owner.r) { this.draw_update() }
        ctx.save(); // Save the current context
        ctx.translate(this.owner.pos.x, this.owner.pos.y);
        ctx.rotate(this.rel_rot);
        ctx.beginPath();
        ctx.arc(0, 0, this.r, -this.basesize, this.basesize, true);
        ctx.lineTo(this.disance1, this.width);
        ctx.lineTo(this.disance1, -this.width);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = this.owner.bor_s;
        ctx.strokeStyle = this.bor_col;
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(this.disance1, this.width);
        //ctx.lineTo(this.disance1-this.width, 0);
        ctx.lineTo(this.disance1, -this.width);
        ctx.lineTo(this.disance2, -this.width2);
        ctx.lineTo(this.disance2, this.width2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = this.owner.bor_s;
        ctx.strokeStyle = this.bor_col;
        ctx.stroke();
        ctx.restore(); // Restore the context to avoid affecting other drawings
    }
    ///
    this.og_ow_r = this.owner.r
    this.draw_update = function () {
        let newR = this.owner.r / this.og_ow_r
        this.width *= newR
        this.width2 *= newR
        this.disance1 *= newR
        this.disance2 *= newR
        this.r *= newR
        this.og_ow_r = this.owner.r
    }
    this.act1 = comb_func(F_o_Shoot2, F_turret_rot)
    this.arrays = [this.owner.child, ACT1, DRW_2]
}
function gun_1t_setup() {
    this.bl_st.b_spawn = bulletSpawn.turret

    let rel_rot_max = this.setup_stats.rel_rot_max ?? Infinity
    this.rel_rot_max = this.rel_rot + rel_rot_max / 2
    this.rel_rot_min = this.rel_rot - rel_rot_max / 2

    this.bl_st.rel_dis -= (1 - this.setup_stats.r)

    //draw
    this.r = this.owner.r * this.setup_stats.r
    this.disance1 = this.r + this.owner.r * (this.bl_st.rel_vel / 30) //* ((Main/2-Math.abs(i2))/2+1)
    this.disance2 = this.disance1 + this.owner.r * (this.bl_st.ran_vel / 60)
    this.width = this.owner.r * this.bl_st.r
    this.width2 = this.width + this.bl_st.ran_rot * (this.bl_st.ran_vel / 60) * this.owner.r  // spread
    this.basesize = Math.min(Math.PI / 2, this.bl_st.r * (1 / this.setup_stats.r))

    this.drw_2 = function () {
        if (this.og_ow_r != this.owner.r) { this.draw_update() }
        ctx.save(); // Save the current context
        ctx.translate(this.owner.pos.x, this.owner.pos.y);
        ctx.rotate(this.rel_rot);
        ctx.beginPath();
        ctx.arc(0, 0, this.r, -this.basesize, this.basesize, true);
        ctx.lineTo(this.disance1, this.width);
        ctx.lineTo(this.disance1, -this.width);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = this.owner.bor_s;
        ctx.strokeStyle = this.bor_col;
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(this.disance1, this.width);
        //ctx.lineTo(this.disance1-this.width, 0);
        ctx.lineTo(this.disance1, -this.width);
        ctx.lineTo(this.disance2, -this.width2);
        ctx.lineTo(this.disance2, this.width2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = this.owner.bor_s;
        ctx.strokeStyle = this.bor_col;
        ctx.stroke();
        ctx.restore(); // Restore the context to avoid affecting other drawings
    }
    ///
    this.og_ow_r = this.owner.r
    this.draw_update = function () {
        let newR = this.owner.r / this.og_ow_r
        this.width *= newR
        this.width2 *= newR
        this.disance1 *= newR
        this.disance2 *= newR
        this.r *= newR
        this.og_ow_r = this.owner.r
    }
    this.act1 = comb_func(F_o_Shoot2, F_turret_rot)
    this.arrays = [this.owner.child, ACT1, DRW_2]
}





class gun_turret {
    constructor(owner, gun_st = {}, turret_st = {}) {

        let bl_r = gun_st.bl_r ?? S_ran(1)
        let bl_vel = gun_st.bl_vel ?? 11.2
        let bl_ran_vel = gun_st.bl_ran_vel ?? 14
        let bl_ran_rot = gun_st.bl_ran_rot ?? 0.2
        let r = gun_st.r ?? 0.3
        this.owner = owner
        this.r = r * this.owner.r ?? this.owner.r * 0.5
        this.rel_rot = gun_st.rel_rot ?? 1.5


        let rel_rot_max = gun_st.rel_rot_max ?? 0.6
        this.rel_rot_max = this.rel_rot + rel_rot_max
        this.rel_rot_min = this.rel_rot - rel_rot_max


        this.color = rgba_mix(this.owner.color, COL.gun, 0.3)
        this.bor_col = rgba_mix(this.owner.bor_col, COL.gun, 0.8)
        this.bor_s = this.owner.bor_s



        ///shooting
        this.recoil = gun_st.recoil ?? -2
        this.bulletsize = bl_r
        this.b_spead = gun_st.b_spead ?? 12
        this.reload = gun_st.reload ?? 8
        this.charge = gun_st.reload ?? 8
        this.bl_sn = gun_st.bl_sn ?? 6
        this.bl_n = gun_st.bl_n ?? 1
        //dreaing
        this.disance1 = this.r + this.owner.r * (bl_vel / 30) //* ((Main/2-Math.abs(i2))/2+1)
        this.bl_st = {
            frict: 0.97,
            r: bl_r,
            m: 0.1,
            inv_m: 1 / 0.1,
            hard: 0.0,
            elast: 0,
            slide: 0,
            stk: 0,
            maxage: gun_st.maxage ?? 300,
            hp: gun_st.hp ?? 20,
            maxhp: gun_st.hp ?? 20,
            dmg: gun_st.dmg ?? 0.3,
            arrays: [KILLABLE, DRW_2, COLLI_BDMG, REPOS],
            ran_rot: bl_ran_rot,
            ran_vel: bl_ran_vel,
            rel_rot: this.rel_rot,
            rel_dis: bl_vel / 30 - (1 - r),
            rel_vel: bl_vel,
            relat: gun_st.relat ?? {
                bou: 1,//0 = don't do //1 = do //-1 = don't do even if other do 2= do even if other is -1
                ing: 0,// on equal ranks es: 2  other minion 
                bou_0: 1,
                ing_0: 1,// on superior ranks es: 1 players
                bou_1: 1,
                ing_1: 0,// on inferior ranks es: 3 bullets    // cannot ingore differents team}
            }
        }
        this.disance2 = this.disance1 + this.owner.r * (bl_ran_vel / 60)
        this.width = this.owner.r * bl_r
        this.width2 = this.width + bl_ran_rot * (bl_ran_vel / 60) * this.owner.r  // spread
        this.basesize = Math.min(Math.PI / 2, bl_r * (1 / r))
        this.drw_2 = function () {
            if (this.og_ow_r != this.owner.r) { this.draw_update() }
            ctx.save(); // Save the current context
            ctx.translate(this.owner.pos.x, this.owner.pos.y);
            ctx.rotate(this.owner.rotation + this.rel_rot);
            ctx.beginPath();
            ctx.arc(0, 0, this.r, -this.basesize, this.basesize, true);
            ctx.lineTo(this.disance1, this.width);
            ctx.lineTo(this.disance1, -this.width);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.lineWidth = this.owner.bor_s;
            ctx.strokeStyle = this.bor_col;
            ctx.stroke();
            ctx.beginPath();
            ctx.lineTo(this.disance1, this.width);
            //ctx.lineTo(this.disance1-this.width, 0);
            ctx.lineTo(this.disance1, -this.width);
            ctx.lineTo(this.disance2, -this.width2);
            ctx.lineTo(this.disance2, this.width2);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.lineWidth = this.owner.bor_s;
            ctx.strokeStyle = this.bor_col;
            ctx.stroke();
            ctx.restore(); // Restore the context to avoid affecting other drawings
        }
        ///
        this.og_ow_r = this.owner.r
        this.draw_update = function () {
            let newR = this.owner.r / this.og_ow_r
            this.width *= newR
            this.width2 *= newR
            this.disance1 *= newR
            this.disance2 *= newR
            this.r *= newR
            this.og_ow_r = this.owner.r
        }
        this.act1 = comb_func(F_o_Shoot2, F_turret_rot)
        this.arrays = [this.owner.child, ACT1, DRW_2]
        this.DIE = DIE_2
        this.DIE_anim = DIE_anim0
        this.arrays.forEach((arr) => arr.push(this));
    }
}
class hp_diplay {
    constructor(owner, rot_vel = -1 / 120, bias = Math.random() * P2,) {
        this.bias = bias
        this.owner = owner
        this.color = rgba_mix(owner.color.c, 'rgb(255,255,255,1)', 0.45)
        this.bor_col = rgba_mix(owner.bor_col.c, 'rgb(0,0,0,0.4)', 0.3)
        this.rot_vel = rot_vel
        this.arrays = [this.owner.child, DRW_2]
        this.DIE = DIE_0
        this.arrays.forEach((arr) => arr.push(this));
    }
    drw_2() {
        if (this.owner.maxhp > this.owner.hp > 0) {
            let inv_per = ((this.owner.maxhp - this.owner.hp) / this.owner.maxhp)
            let per = 1 - inv_per

            let halfp = 1 - (((per))) ** 5

            let perc = per * P2
            let C = ((this.rot_vel * frameCount + this.bias % P2))

            ctx.beginPath();
            ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r * (0.85), 0, P2);
            ctx.strokeStyle = this.bor_col;
            ctx.lineWidth = this.owner.r * 0.23 * halfp
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r * (0.85), 0.0001 + C, perc + C);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.owner.r * 0.15 * halfp
            ctx.stroke();
            ctx.closePath();

        }
    }
}

class cl_body {
    constructor(owner) {
        this.owner = owner
        this.arrays = [DRW_2, this.owner.child]
        this.DIE = DIE_01
        this.arrays.forEach((arr) => arr.push(this));
    }
    drw_2() {
        ctx.beginPath();
        ctx.lineWidth = this.owner.bor_s;
        ctx.strokeStyle = this.owner.bor_col.c;
        ctx.fillStyle = this.owner.color.c;
        ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r, 0, P2,);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

}
class cl_name {

    constructor(owner, name = ":D") {
        owner.display_name = name
        this.owner = owner
        this.color = rgba_mix(owner.color.c, 'rgb(255,255,255,1)', 0.2)
        this.bor_col = rgba_mix(owner.bor_col.c, 'rgb(0,0,0,1)', 0.1)
        this.spikes = 1
        this.drw_2 = function () {

            let Size = 5 / (this.owner.display_name.length + 3)
            Size = Size * 0.6 + (0.5) * 0.4

            ctx.beginPath();
            ctx.lineWidth = this.owner.r / 8
            ctx.strokeStyle = this.bor_col;       // Border color for the circle
            ctx.fillStyle = this.color
            ctx.font = `bold ${Math.floor(this.owner.r * Size)}px Arial`;
            ctx.textAlign = "center";
            //ctx.lineCap = 'round'

            if (true) {
                ctx.strokeText(this.owner.display_name, this.owner.pos.x, this.owner.pos.y - this.owner.r * 1.1,);
                ctx.fillText(this.owner.display_name, this.owner.pos.x, this.owner.pos.y - this.owner.r * 1.1,);
            }
            if (false) {
                var str = this.owner.display_name
                var angle = 0.075 * str.length
                var len = str.length, s;
                ctx.save();
                ctx.translate(this.owner.pos.x, this.owner.pos.y + this.owner.r * (4 - 1.3));
                //ctx.rotate(-1 * angle / 2);
                ctx.rotate(-angle / 2 - (angle / len) / 2);
                for (var n = 0; n < len; n++) {
                    ctx.rotate(angle / len);
                    ctx.save();
                    ctx.translate(0, -1 * this.owner.r * 4);
                    s = str[n];
                    ctx.strokeText(s, 0, 0);
                    ctx.fillText(s, 0, 0);
                    ctx.restore();
                }
                ctx.restore();
            }




            ctx.closePath();
        }
        this.arrays = [this.owner.child, DRW_2]
        this.DIE = DIE_2
        this.DIE_anim = DIE_anim0
        this.arrays.forEach((arr) => arr.push(this));
    }
}
class cl_chat {

    constructor(owner, Message = CHAT_X[Math.trunc(Math.random()*CHAT_X.length)]) {
        this.height = 0
        this.Message = Message
        this.owner = owner
        this.color = rgba_mix(owner.color.c, 'rgb(255,255,255,1)', 0.2)
        this.bor_col = rgba_mix(owner.bor_col.c, 'rgb(0,0,0,1)', 0.1)
        this.back_color = rgba_mix(owner.color.c, owner.bor_col.c, 0.1)
        this.spikes = 1
        this.drw_2 = function () {

            ctx.beginPath();
            ctx.lineWidth = this.owner.r / 8
            ctx.strokeStyle = this.bor_col;       // Border color for the circle
            ctx.fillStyle = this.color
            ctx.font = `bold ${Math.floor(this.owner.r * 0.8)}px Arial`;
            ctx.textAlign = "center";
            //ctx.lineCap = 'round'

            if (true) {
                ctx.strokeText(this.Message, this.owner.pos.x, this.owner.pos.y - this.owner.r * (1.7+this.height));
                ctx.fillText(this.Message, this.owner.pos.x, this.owner.pos.y - this.owner.r * (1.7+this.height));
                this.height += 0.03
            }
            if (false) {
                var str = this.Message
                var angle = 0.075 * str.length
                var len = str.length, s;
                ctx.save();
                ctx.translate(this.owner.pos.x, this.owner.pos.y + this.owner.r * (4 - 1.3));
                //ctx.rotate(-1 * angle / 2);
                ctx.rotate(-angle / 2 - (angle / len) / 2);
                for (var n = 0; n < len; n++) {
                    ctx.rotate(angle / len);
                    ctx.save();
                    ctx.translate(0, -1 * this.owner.r * 4);
                    s = str[n];
                    ctx.strokeText(s, 0, 0);
                    ctx.fillText(s, 0, 0);
                    ctx.restore();
                }
                ctx.restore();
            }




            ctx.closePath();
        }
        this.arrays = [this.owner.child, DRW_2]
        this.DIE = DIE_2
        this.DIE_anim = DIE_anim0
        this.arrays.forEach((arr) => arr.push(this));
    }
}


class cl_aura0 {
    constructor(owner, aura_stats = {}) {
        this.owner = owner
        this.size = aura_stats.size ?? 130

        const color_fun = (X) => rgba_mult(X.owner.color.c, 0.1, 0.1, 0.1, 0.5);
        const bor_col_fun = (X) => rgba_mult(rgba_max_sat(X.owner.color.c), 1, 1, 1, 0.1);
        this.color_fun = aura_stats.color_func ?? color_fun;
        this.bor_col_fun = aura_stats.bor_col_func ?? bor_col_fun;
        this.color = this.color_fun(this);
        this.bor_col = this.bor_col_fun(this);
        this.color_scale = aura_stats.color_scale ?? 1.8
        this.bor_scale = aura_stats.bor_scale ?? 0.034

        this.dmg = aura_stats.dmg ?? 0.2

        this.arrays = aura_stats.arrays ?? [];
        this.arrays.push(this.owner.child)

        this.DIE = DIE_2
        this.DIE_anim = DIE_anim0
        this.arrays.forEach((arr) => arr.push(this));


        //aura_stats.FUNTION_G.forEach((f)=>{this[f] = aura_stats.FUNTION_G[f]})

        for (var f in aura_stats.FUNTION_G) {
            this[f] = aura_stats.FUNTION_G[f]
        }

    }
}

function aura_draw0() {
    ctx.beginPath();
    const grad = ctx.createRadialGradient(this.owner.pos.x, this.owner.pos.y, this.owner.r, this.owner.pos.x, this.owner.pos.y, this.owner.r + this.size * this.color_scale)
    grad.addColorStop(0, this.color);
    grad.addColorStop(1, this.bor_col);
    ctx.fillStyle = grad
    ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r + this.size, 0, P2, true);
    ctx.fill();
    ctx.closePath();
}
function aura_draw1() {
    ctx.beginPath();
    const grad = ctx.createRadialGradient(this.owner.pos.x, this.owner.pos.y, this.owner.r, this.owner.pos.x, this.owner.pos.y, this.owner.r + this.size * this.color_scale)
    grad.addColorStop(0, this.color);
    grad.addColorStop(1, this.bor_col);
    ctx.fillStyle = grad
    ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r + this.size, 0, P2, true);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = this.bor_col;
    let wid = this.size * this.bor_scale
    ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r + this.size - wid / 2 + this.owner.bor_s, 0, P2, true);
    ctx.lineWidth = wid;
    ctx.stroke();
    ctx.closePath();
}


class cl_spike {
    constructor(owner, rank = 3, rot_speed = -120, r0 = 1, r1 = 1.3, r2 = 1, write = false) {
        this.owner = owner
        this.rot_speed = rot_speed
        if (write) {
            let c = this.owner.color.sat(-0.3).lig(0.3)
            let b = this.owner.bor_col.sat(-0.3).lig(0.3)

            this.color = c.c
            this.bor_col = b.c
        } else {
            let c = this.owner.color.sat(-0.3).lig(-0.5)
            let b = this.owner.bor_col.sat(-0.3).lig(-0.5)

            this.color = c.c
            this.bor_col = b.c
        }
        this.spikes = rank
        this.r0 = r0
        this.r1 = r1
        this.r2 = r2
        this.arrays = [this.owner.child, DRW_2]
        this.DIE = DIE_2
        this.DIE_anim = DIE_anim0
        this.arrays.forEach((arr) => arr.push(this));
        this.drw_2 = F_drawStar_void
    }
}