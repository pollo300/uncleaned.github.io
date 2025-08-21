class Spawner{
    constructor(x, y){
        this.pos = new Vec(x,y);
        this.owner = Math.random();
        this.spawned = [];

        this.spawnrate = 300
        this.spawn_wait = 366
        this.spawn_random = 400

        this.spawnmax = 5
        this.sp_number = 0
        this.sp_alive = []
        
        this.types = [0]
        this.r = 12
        this.r_max = 600
        this.color = rgba(233, 233, 233, 0.5)
        this.bor_col = rgba(50, 50, 50, 0)
        DRAW_GR.push(this)
    }
    spawn(){
        this.spawn_wait++
        let spawn = true

        //stop spawning
        if(this.sp_alive.length >= this.spawnmax){
            spawn = false
            for (let i = 0; i < this.sp_alive.length; i++) {
                // add a distance cap?
                if (!COLLI_B.includes(this.sp_alive[i])){this.sp_alive.splice(i,1)}
            }
        }

        //spawn
        if(this.spawn_wait>this.spawnrate && spawn) {

            let N = [R_in(0,this.spawned.length-1)]

            if (!this.spawned[N]) {this.spawned.splice(N,1); return}
            if (!this.spawned[N].pos) {this.spawned.splice(N,1); return}

            let n = deepClone(this.spawned[N])


            let distance = this.r_max*Math.random()
            let angle = Math.random()*P2;
            x = Math.cos(angle);
            y = Math.sin(angle);

            n.pos.x = this.pos.x + x*distance
            n.pos.y = this.pos.y + y*distance

            n.target_r = n.r
            n.r = 0



            this.spawn_wait = this.spawn_random*Math.random()
            this.sp_number++
            this.sp_alive.push(n)
        }

        //growing
        for (let i = 0; i < this.sp_alive.length; i++) {
            if (this.sp_alive[i].r < this.sp_alive[i].target_r) {
                this.sp_alive[i].r += this.sp_alive[i].target_r/this.spawnrate
            } else {this.sp_alive.splice(i,1)}
        }


    }
}
class Ball_old{
    constructor(x, y, r, m){
        this.child = []
        this.types = [0]
        this.pos = new Vec(x,y);
        this.old_x = 0
        this.old_y = 0
        this.vel = new Vec(0,0);


        this.hard =1;
        //decides which group the ball can collide with


        this.hard =1;
        this.r = r;
        this.m = m;
        this.elast = 1;
        this.friction = Math.random()/8+0.05
        this.slide = 0.1
        this.stk = 0
        if (this.m === 0){
            this.inv_m = 1000000000000;    // prima era 0
        } else {
            this.inv_m = 1 / this.m;
        }


        this.color = "rgba(50, 50, 50, 0.5)";
        this.bor_col = "rgba(90, 0, 0, 1)";
        this.bor_s = Math.log2(this.r+1)/2
    }
    draw(){
        drawBall(this)
    }
}
class Wall_old{
    constructor(x, y, w, h){
        this.pos = new Vec(x,y);
        this.w = Math.abs(w)
        this.h = Math.abs(h)
        this.m = 1000000;
        this.old_x = 0
        this.old_y = 0
        this.elast = 1;
        this.color = "rgba(50, 50, 50, 0.5)";
        this.bor_col = "rgba(90, 0, 0, 1)";
        this.vel = new Vec(0,0);
        this.hard =1;
        //decides which group the ball can collide with
        this.friction = Math.random()/8+0.05
        this.slide = 0.1
        this.stk = 0
        this.bor_s = Math.log2((w+h)/4+1)/3
        if (this.m === 0){
            this.inv_m = 1000000000000;    // prima era 0
        } else {
            this.inv_m = 1 / this.m;
        }
        DRAW_R.push(this)
        this.arrays = [DRAW_R]
    }
}
class Cust{
    constructor() {
        this.ppols = 82982919829
        this.arrays = [Act, DRAW_];
    }
    Act() {
        console.log("Cust Act");
    }
    DRAW_() {
        console.log("Cust DRAW_");
    }
    Setup() {
        this.id = ID_GEN;
        ID_GEN++;
        console.log("Cust Setup");
    }
}
class P_dreawball {
    Act() {
        this.owner = 321;
        console.log("P_dreawball Act");
    }
    Act2() {
        this.owner = 321;
        console.log("P_dreawball Act2");
    }
    Act3() {
        this.owner = 321;
        console.log("P_dreawball Act2");
    }
}
class Agent {

    constructor() {
        this.types = [1]
        this.owner = Math.random()
        this.stn_count = 26 // stable neurons count neurons used for recive or emit input externaly, (the first of the array) they should not be subject to mutation
        this.max_n = 60
        this.max_w = 200
        //neurons values array
        this.value = [0,0,0,0,0,0,0,0,0,0,0,0,0]
        this.bias = [0,0,0,0,0,0,0,0,0,0,0,0,0]
        //weitgh values array
        this.from = [1,2,3,4,5,6,7,8,9,10]
        this.to = [10,1,2,3,4,5,6,7,8,9]
        this.multipler = [1,2,3,4,5,6,7,8,9,10]
        this.mutationrate = [1,2,3,4,5,6,7,8,9,10]
        // agents stats
        this.fit = 340;
        this.age = 0;
        AGENTS.push(this);
        // custom stats
        this.pos = new Vec(WG_x+gaussianRandom(0,212),WG_x+gaussianRandom(0,212));
        this.r = 39;
       this.m = 55;
       if (this.m === 0){
          this.inv_m = 1000000000000;    // prima era 0
        } else {
            this.inv_m = 1 / this.m;
         }
         this.bor_s = Math.log2(this.r+1)/2
         this.old_x = 0
        this.old_y = 0
       this.elast = 0.2;
        this.friction = 0.04;
        this.color = "rgba(50, 50, 50, 0.5)";
        this.bor_col = "rgba(90, 0, 0, 1)";
        this.vel = new Vec(gaussianRandom(0,0.2),gaussianRandom(0,0.2));
        this.hard = 0.02;
        this.slide = 0
        this.stk = 0.1
        this.speed = 1;
        this.dmg = 0.001;
        this.hp = 100;
        this.maxhp = 400;
    
        this.rotation = 0
        this.team = 1;
        this.time = 50
      //  this.age = 0
        this.maxage = Infinity
        //decides which group the ball can collide with in this case it can collide with other but not between themself
        this.child = []
    
        KILLABLE.push(this)
        COLLI_B.push(this);
        DRAW_B.push(this)
        this.arrays = [KILLABLE,COLLI_B,DRAW_B,AGENTS]
    }
    act(){
        //this.clear()
        //this.see()
        //this.mutate()
        this.calc()
        this.use()
        //L(this.value.length+"_"+this.bias.length+""+""+"")
       // L(this.from.length+"_"+this.to.length+"_"+this.multipler.length+"_"+this.mutationrate.length+""+""+"")
    }
    clear(){
        for (let l = 0; l < this.value.length; l++) {
            this.value[l] = 0
        }
    }
    calc() {
        for (let l = 0; l < this.from.length; l++) {

            this.value[this.from[l]] =Cu_sig(this.value[this.from[l]])

            this.value[this.to[l]] =

            this.value[this.from[l]] *
            this.multipler[l] + 
            this.bias[this.to[l]];

            
            //this.value[this.from[l]] = 0
        }
    }
    // Mutate the entire agent by applying mutations to all neurons and create new connections and neurons
    mutate() {
        // Mutate weights of existing connections
        for (let l = 0; l < this.from.length; l++) {
            this.multipler[l] += this.mutationrate[l] * (Math.random() - 0.5);
            this.mutationrate[l] += (Math.random() - 0.5) / 2; // Mutation rate mutation
        }

        // Randomly add new connections
        if (Math.random() < 0.1 && this.from.length < this.max_w) { // 10% chance to add a connection
            this.addConnection();
        }

        // Randomly add a new neuron
        if (Math.random() < 0.05 && this.value.length < this.max_n) { // 5% chance to add a new neuron
            this.addNeuron();
        }

        // Randomly delete a connection
        if (Math.random() < 0.01) { // 5% chance to delete a connection
            this.deleteConnection();
        }

        // Randomly delete a neuron (not stable ones)
        if (Math.random() < 0.03 && this.value.length > this.stn_count) { // 4% chance
            this.deleteNeuron();
        }
    }
    // Add a new connection between two random neurons
    addConnection() {
        let fromNeuron = Math.floor(Math.random() * this.value.length);
        let toNeuron = Math.floor(Math.random() * this.value.length);
        // Ensure that the connection isn't between the same neuron and doesn't already exist
        if (fromNeuron !== toNeuron) {                                       //&&!this.from.includes(fromNeuron) && !this.to.includes(toNeuron)
            this.from.push(fromNeuron);
            this.to.push(toNeuron);
            this.multipler.push(Math.random() * 2 - 1); // Random weight between -1 and 1
            this.mutationrate.push(Math.random() * 0.1); // Small initial mutation rate
        }
    }
    // Add a new neuron by splitting an existing connection
    addNeuron() {
        if (this.from.length === 0) return; // No connections to split

        // Randomly select a connection to split
        let index = Math.floor(Math.random() * this.from.length);

        // Create a new neuron
        let newNeuronIndex = this.value.length;
        this.value.push(0); // Add new neuron value
        this.bias.push(-Math.random()); // Random bias for the new neuron Math.random() * 2 - 1

        // Split the connection: disable the old connection
        let oldFrom = this.from[index];
        let oldTo = this.to[index];
        this.to[index] = newNeuronIndex; // Make the "to" part of the connection point to the new neuron

        // Create a new connection from the new neuron to the old "to" neuron
        this.from.push(newNeuronIndex);
        this.to.push(oldTo);
        this.multipler.push(1); // New connection with multiplier 1
        this.mutationrate.push(Math.random() * 0.1); // Small initial mutation rate
    }
    // Delete a random connection
    deleteConnection() {
        if (this.from.length > this.stn_count.length) {           // prima era 0
            let index = Math.floor(Math.random() * this.from.length);
            this.from.splice(index, 1);
            this.to.splice(index, 1);
            this.multipler.splice(index, 1);
            this.mutationrate.splice(index, 1);
        }
    }
    // Delete a random neuron (not stable ones)
    deleteNeuron() {
        if (this.value.length <= this.stn_count) return; // No deletable neurons, just return
    
        // Randomly select a neuron to delete (not from the stable ones)
        let neuronIndex = Math.floor(Math.random() * (this.value.length - this.stn_count)) + this.stn_count;
    
        // First, filter and splice all connections that involve the neuron to be deleted
        for (let i = this.from.length - 1; i >= 0; i--) { // Traverse backwards to avoid index issues
            if (this.from[i] === neuronIndex || this.to[i] === neuronIndex) {
                // Remove the connection at index 'i' from all arrays simultaneously
                this.from.splice(i, 1);
                this.to.splice(i, 1);
                this.multipler.splice(i, 1);
                this.mutationrate.splice(i, 1);
            }
        }
    
        // Remove the neuron itself from the 'value' and 'bias' arrays
        this.value.splice(neuronIndex, 1);
        this.bias.splice(neuronIndex, 1);
    
        // Adjust the indices in 'from' and 'to' arrays
        // Any index higher than the deleted neuron should be decremented by 1
        for (let i = 0; i < this.from.length; i++) {
            if (this.from[i] > neuronIndex) {
                this.from[i] -= 1;
            }
            if (this.to[i] > neuronIndex) {
                this.to[i] -= 1;
            }
        }
    }
    copy() {
        let C = new Agent()
        C.speed = this.speed
        C.stn_count = this.stn_count
        C.max_n = this.max_n
        C.max_w = this.max_w
        C.value = [...this.value]
        C.bias = [...this.bias]
        C.from = [...this.from]
        C.to = [...this.to]
        C.multipler = [...this.multipler]
        C.mutationrate = [...this.mutationrate]
        C.types = [...this.types]
        C.fit = this.fit
        C.pos = this.pos
        C.hp = this.hp
        C.rotation = Math.random()*2*Math.PI
        C.color = MIX_rgb(getRandomRGBA(1,1),this.color,0.2);
        C.bor_col = MIX_rgb(MIX_rgb(getRandomRGBA(1,1),rgba(0,0,0,1),0.1),this.bor_col,0.2);



        let bl = defualbullet


        let wp = new Poly(WG_x,WG_y-112,);
        wp.owner = C
        wp.bullet =bl
        wp.color = MIX_rgb(wp.owner.color,rgba(144,144,144,1),0.2)
        wp.bor_col = MIX_rgb(wp.owner.bor_col,rgba(144,144,144,1),0.8)
        wp.bor_s = wp.owner.bor_s
        C.child.push(wp)


    return C            
    }
    see() {
    //this.value[8] = WG_x - this.pos.x
    //this.value[9] = WG_y - this.pos.y
    //this.value[10] = -WG_y + this.pos.y
    //this.value[11] = - WG_x + this.pos.x
    this.value[0] = this.hp/this.maxhp
    this.value[1] = this.hp/this.maxhp
    this.detect( 100,100, 0  ,0  ,2)
    this.detect( 0  ,100,-100,0  ,3)
    this.detect( 0  ,0  ,-100,-100,4)
    this.detect( 100,0  , 0  ,-100,5)
    this.detect( 200,100, 100,0  ,6)
    this.detect( 200,0  , 100,-100,7)
    this.detect(-100,100,-200,0  ,8)
    this.detect(-100,0  ,-200,-100,9)
    this.detect( 100,-100,-0  ,-200,10)
    this.detect( 0  ,-100,-100,-200,11)
    this.detect( 100,200, 0  ,100,12)
    this.detect( 0  ,200,-100,100,13)
    this.detect(-100,300,-300,100,14)
    this.detect( 100,400,-100,200,15)
    this.detect( 300,300, 100,100,16)
    this.detect( 400,100, 200,-100,17)
    this.detect( 300,-100, 100,-300,18)
    this.detect( 100,-200,-100,-400,19)
    this.detect(-100,-100,-300,-300,20)
    this.detect(-200,100,-400,-100,21)






    }
    use() {

        let V = Math.sqrt(this.value[22]**2 + this.value[23]**2)*this.speed

        let dir = new Vec(this.value[22]/V*8,this.value[23]/V*8)
        
        this.vel = this.vel.add(dir)

        this.rotation += (this.value[24]+this.value[25])/6
       
        //value 4 = not reproduce
    }
///////////custom 
    display(){
        ctx.fillStyle = "black";
        ctx.font = "30px Verdana"
        //ctx.fillText("SEE = "+this.value[0], this.pos.x-30, this.pos.y+10);
        ctx.fillText(Math.trunc(this.hp), this.pos.x-30, this.pos.y+10);
    }
    detect(x,y,mix,miy,id){
      let box = {
      maxX : this.pos.x +x,
      maxY : this.pos.y +y,
      minX : this.pos.x +mix,
      minY : this.pos.y +miy,
      }
      const cands = rtree.search(box);
      cands.forEach(cand => {
        this.value[id]+=1
      });
    }


}
class Group {
    constructor() {
        this.components = [];  // Balls in the group
        this.pos = new Vec(150, 160);  // Center of mass of the group
        this.vel = new Vec(0, 0);  // Group's velocity
        COLLI_G.push(this);      // Add group to the collision system
        this.totalMass = 0;  // Store the total mass of the group for efficient center of mass calculations
        this.comp_pos = []; 
        this.comp_rel_pos = []; // Relative positions of each ball to the center of mass
        this.angularVel = 0.01;  // Group's angular velocity (rotation speed)

        
    }
    addBall(ball) { // Add a ball to the group and update total mass and relative positions
        this.components.push(ball);
        this.totalMass += ball.m;



        // Calculate the relative position of the ball to the group's center of mass
        this.comp_pos.push(ball.pos);
        this.center_of_mass()
        


        this.comp_rel_pos.push(ball.pos.subtr(this.pos));
        this.chang_relpos()
    }
    add(ball) { // Add a ball to the group and update total mass and relative positions
        this.components.push(ball);
    }
    displace_to_angular_Vel() {
        this.angularVel = 0;  // Initialize the angular velocity
    
        this.components.forEach((ball, index) => {
            let relativePos = this.comp_rel_pos[index]; // Original relative position of the ball to the group center
            let currentDisplacement = ball.pos.subtr(this.pos); // Current displacement of the ball relative to the group center
    
            // Normalize both vectors (relativePos and currentDisplacement)
            let relPosNorm = relativePos.normal(); // Normalized original position
            let currDispNorm = currentDisplacement.normal(); // Normalized current displacement
    
            // Compute the dot product between the two vectors
            let dotProduct = relPosNorm.dot(currDispNorm);
    
            // Clamp the dot product value to avoid floating-point errors
            dotProduct = Math.max(-1, Math.min(1, dotProduct));
    
            // Compute the angular displacement using the dot product (acos gives the angle)
            let angularDisplacement = Math.acos(dotProduct);
    
            // Use the cross product to determine if the rotation is clockwise or counterclockwise
            let crossProduct = relPosNorm.x * currDispNorm.y - relPosNorm.y * currDispNorm.x;
    
            // If crossProduct is negative, the rotation is clockwise, so we make angularDisplacement negative
            if (crossProduct < 0) {
                angularDisplacement = -angularDisplacement;
            }
    
            // Update the ball's position back to the original relative position
            //ball.pos = this.pos.add(relativePos);
    
            // Accumulate angular displacement to compute average angular velocity (for group)
            this.angularVel += angularDisplacement;
        });
    
        // Average angular velocity for the group (optional, based on the number of components)
        this.angularVel /= this.components.length;
    }
    rotate_group() {
        const angle = this.angularVel;  // The angle by which the group rotates
    
        this.components.forEach((ball, index) => {
            let relativePos = this.comp_rel_pos[index];  // Get the relative position of the ball
    
            // Apply rotation to the relative position
            let cosA = Math.cos(angle);
            let sinA = Math.sin(angle);
    
            let rotatedX = relativePos.x * cosA - relativePos.y * sinA;
            let rotatedY = relativePos.x * sinA + relativePos.y * cosA;
    
            let rotatedPos = new Vec(rotatedX, rotatedY);
            // Update the ball's position to maintain its rotated position relative to the group's center
           // ball.vel = ball.vel.add(rotatedPos.subtr(relativePos));//this.comp_rel_pos[index]
            //ball.vel = rotatedPos.subtr(relativePos);//this.comp_rel_pos[index]

            ball.pos = this.pos.add(rotatedPos);
    
            // Optionally, update the relative position after rotation
            this.comp_rel_pos[index] = rotatedPos;
        });
    }
    // Calculate the center of mass based on the positions and masses of the balls
    center_of_mass() {
        let weightedSum = new Vec(0, 0);
        this.totalMass = 0;

        this.components.forEach(ball => {
            weightedSum = weightedSum.add(ball.pos.mult(ball.m));
            this.totalMass += ball.m;
        });

        if (this.totalMass != 0) {
            this.pos = weightedSum.div(this.totalMass);  // Update the group's center of mass
        }
    }
    chang_relpos(){
        this.center_of_mass()
        this.components.forEach((ball, index) => {
            this.comp_rel_pos[index].y =  ball.pos.y - this.pos.y
            this.comp_rel_pos[index].x =  ball.pos.x - this.pos.x
        })
    }
    // Apply rotation to the group based on angular velocity
    movetorelativepos() {
        this.components.forEach((ball, index) => {

            ball.pos = this.pos.add(this.comp_rel_pos[index])
            //ball.pos.y = this.comp_rel_pos[index].y + this.pos.y
            //ball.pos.x = this.comp_rel_pos[index].x + this.pos.x

            //ball.pos = ball.pos.add(this.pos)
            

        });
    }
    // Calculate angular velocity based on some external factors or interaction (this can be customized)
    // repos the group based on velocity and rotation
    repos() {
        this.center_of_mass()
        this.displace_to_angular_Vel()
        this.rotate_group()
        //this.movetorelativepos();

        // Update the group's position based on its linear velocity
        //this.pos = this.pos.add(this.vel);

        // Rotate the balls within the group based on the angular velocity

    }
}




class _owner{
    constructor() {
        this.child = [];
    }
}
class _child{
    constructor() {
        this.owner = 0
    }
}
class _act{
    constructor() {
    this.arrays = [];
    }
}
class _repo{
    constructor() {
    this.pos = new Vec(WG_x,WG_y)
    this.vel = new Vec(0,0)
    this.old_x = 0
    this.old_y = 0
    }
}
class _collider_b{
    constructor(){
        this.hard =1;
        this.r = 20;
        this.m = 20;
        this.elast = 1;
        this.friction = Math.random()/8+0.05
        this.slide = 0.1
        this.stk = 0
        if (!this.inv_m) {
            if (this.m === 0){
                this.inv_m = 1000000000000;
            } else {
                this.inv_m = 1 / this.m;
            }
        }
    }
}
class _rotation{
    constructor(){this.rotation = Math.random()}
}
class _Mousfollow{
    constructor(){this.rotation = Math.random()}
}
class _dmg{
    constructor(){
        this.age = 0
        this.hp = 100
        this.maxhp = this.hp
        this.dmg = 1
    }
}
class _regen{
    constructor(){
        this.rg_wait = 0
        this.regen = 0.1
    }
}
class _spawn{
        constructor(){}
        DRAW_(){
            L("generat")    
            drawStar(this.pos.x, this.pos.y,5,12/camera.zoom,27/camera.zoom,getRandomColor()+71,getRandomColor()+11)
        }
        fre(){}
        fresaw(){}
}
class _draw{
    constructor(){
    this.colors = [getRandomRGBA()]
    this.lines = []
    }
    draw(){
        drawBall(this)
    }
}
class _age{
    constructor(){
        this.age = 0
    }
}
// Usage example:
let newclass = eval(`
    class A {
        constructor() {
            // Generate unique random values per instance
            this.x = Math.random(); // Generates a new random number for each instance
            this.y = function() { return Math.random(); } // Returns a new random value on each call
            this.z = () => Math.random(); // Arrow function to generate a new random value
            this.owner = ${Math.random()}  // random but costant for all classes
        }
        
        act() {
            console.log("Random X value:", this.x);  // equal to all classes but random
            console.log("Random Y value:", this.y());  // Call y as a function for a new random value
            console.log("Random Z value:", this.z());  // Call z as an arrow function for a new random value
        }
    }
    A;
`);
// Testing the generated class
let instance1 = new newclass();
instance1.act(); // Should show unique random values
let instance2 = new newclass();
instance2.act(); // Should show different random values than instance1

function custom_obj(objs) {
    ID_GEN++;
    // Create a new class constructor with unique name for debugging
    let className = `CC_${ID_GEN}`;
    let CC = function() {
        // Initialize properties from each object
        objs.forEach(obj => {
            // Copy properties directly to the instance
            Object.keys(obj).forEach(key => {
                this[key] = obj[key];
            });
        });
    };
    // Define the unique name for the class
    Object.defineProperty(CC, 'name', { value: className });
    // Create a custom prototype for the new class
    let customPrototype = {};
    // Merge methods from each object in objs
    objs.forEach(obj => {
        let proto = Object.getPrototypeOf(obj);

        Object.getOwnPropertyNames(proto).forEach(methodName => {
            // Skip constructor
            if (methodName === "constructor") return;

            // Chain functions if there's already a function with the same name
            if (methodName in customPrototype) {
                let existingFunc = customPrototype[methodName];
                customPrototype[methodName] = function(...args) {
                    existingFunc.apply(this, args); // Call the existing function
                    proto[methodName].apply(this, args); // Call the new function
                };
            } else {
                // Otherwise, assign the function from current proto
                customPrototype[methodName] = proto[methodName];
            }
        });
    });
    // Set the combined prototype to the CustomClass
    CC.prototype = customPrototype;
    return CC;
}
class OBJ4_old {
    constructor(...classes) {
        for (let i = 0; i < classes.length; i++) {  //insert all classes
            const cls = classes[i];
            const Generate = new cls
            Object.assign(this, Generate);
            let name = Object.getOwnPropertyNames(cls.prototype)

            for (let i = 1; i < name.length; i++) {  // skip first child  (constructor)

            if (!(name[i] in OBJ4.prototype)) {
                    OBJ4.prototype[name[i]] = cls.prototype[name[i]]  //it should insert all function
            } else {
                /// is should add a function in order
            }
            }
        }
    }
}
class OBJ4 {
    constructor(...classes) {
        // Initialize properties and methods for this instance only
        classes.forEach(cls => {
            // Instantiate each class and copy its properties
            const instance = new cls();
            Object.assign(this, instance);

            // Iterate through each method in the prototype
            Object.getOwnPropertyNames(cls.prototype).forEach(name => {
                if (name !== "constructor") {
                    // Check if this method name already exists on the instance
                    if (this[name]) {
                        // If it exists, wrap both methods in a combined function
                        const existingFunction = this[name];
                        const newFunction = cls.prototype[name].bind(this);

                        this[name] = function (...args) {
                            existingFunction.apply(this, args);  // Call the existing function
                            newFunction.apply(this, args);       // Call the new function
                        };
                    } else {
                        // If it doesn't exist, just add the method
                        this[name] = cls.prototype[name].bind(this);
                    }
                }
            });
        });
    }
}




