function isCircleCollidingWithRectangle(circle, rectangle) {
    // Circle properties
    const circleX = circle.pos.x;
    const circleY = circle.pos.y;
    const circleRadius = circle.r;

    // Rectangle properties
    const rectMinX = rectangle.box.minX;
    const rectMaxX = rectangle.box.maxX;
    const rectMinY = rectangle.box.minY;
    const rectMaxY = rectangle.box.maxY;

    // Step 1: Find the closest point on the rectangle to the circle's center
    const closestX = Math.max(rectMinX, Math.min(circleX, rectMaxX));
    const closestY = Math.max(rectMinY, Math.min(circleY, rectMaxY));

    // Step 2: Calculate the distance between the circle's center and this closest point
    const distanceX = circleX - closestX;
    const distanceY = circleY - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    // Step 3: Determine if the distance is less than or equal to the circle's radius squared
    if (!distanceSquared <= circleRadius * circleRadius) return
    !closestX<0? circle.vel.x = Math.min(0,circle.vel.x) : circle.vel.x = Math.max(0,circle.vel.x)
}
function segmentIntersectionClosest(p1, p2, p3, p4) {
    // Segment 1: p1 -> p2
    // Segment 2: p3 -> p4

    // Calculate direction vectors
    let d1 = p2.sub(p1); // Direction of segment 1
    let d2 = p4.sub(p3); // Direction of segment 2

    // Calculate the determinant of the system
    let determinant = d1.x * d2.y - d1.y * d2.x;

    // If determinant is zero, the segments are parallel or coincident
    if (Math.abs(determinant) < 1e-10) {
        // Find the closest point on segment 2 to the end of segment 1
        return closestPointOnSegment(p2, p3, p4);
    }

    // Solve for the parameters t1 and t2
    let diff = p3.sub(p1); // Vector between the start points
    let t1 = (diff.x * d2.y - diff.y * d2.x) / determinant;
    let t2 = (diff.x * d1.y - diff.y * d1.x) / determinant;

    // Check if the intersection point lies within both segments
    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
        // Calculate the intersection point
        let intersection = p1.add(d1.mult(t1));
        return intersection; // Return the intersection point
    }

    // No valid intersection, return the closest point on segment 2 to the end of segment 1
    return closestPointOnSegment(p2, p3, p4);
}

// Function to find the closest point on a segment to a given point
function closestPointOnSegment(point, segStart, segEnd) {
    let segDir = segEnd.sub(segStart); // Direction of the segment
    let segLengthSq = segDir.dot(segDir); // Segment length squared

    // Handle degenerate case (segment is a single point)
    if (segLengthSq === 0) return segStart;

    // Project the point onto the segment and clamp the result to [0, 1]
    let t = (point.sub(segStart)).dot(segDir) / segLengthSq;
    t = Math.max(0, Math.min(1, t));

    // Return the closest point
    return segStart.add(segDir.mult(t));
}

function segmentIntersection(p1, p2, p3, p4) {
    // Segment 1: p1 -> p2
    // Segment 2: p3 -> p4

    // Calculate direction vectors
    let d1 = p2.sub(p1); // Direction of segment 1
    let d2 = p4.sub(p3); // Direction of segment 2
    // Calculate the determinant of the system
    let determinant = d1.x * d2.y - d1.y * d2.x;
    // If determinant is zero, the segments are parallel or coincident
    if (Math.abs(determinant) < 1e-10) {
        // Find the closest point on segment 2 to the end of segment 1
        return closestPointOnSegment(p2, p3, p4);
    }
    // Solve for the parameters t1 and t2
    let diff = p3.sub(p1); // Vector between the start points
    let t1 = (diff.x * d2.y - diff.y * d2.x) / determinant;
    let t2 = (diff.x * d1.y - diff.y * d1.x) / determinant;
    // Check if the intersection point lies within both segments
    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
        // Calculate the intersection point
        let intersection = p1.add(d1.mult(t1));
        return intersection; // Return the intersection point
    }

    return false
}





function Line_Ball_2(b,p1,p2){
    b.friction = 0.1
    let futurevel = b.vel.mult(1-b.friction) // collision

    let Lin_unit = p1.sub(p2)
    Lin_unit._unit()
    let Lin_r = Lin_unit.mult(b.r)

    let Lin_sawp = new Vec (-Lin_r.y,Lin_r.x)
    let futurepos = b.pos.add(futurevel)


    let futur_collP = futurepos.sub(Lin_sawp)
    let closest_ball = b.pos.sub(Lin_sawp)
    //let closest_ball = futurepos.sub(Lin_sawp)
    //closest_ball._subtr(futurevel.mult(10))

//////////////////////////////////////////////////////////

        let d1 = p2.sub(p1); // Direction of Line 1
        let d2 = futur_collP.sub(closest_ball); // Direction of Line 2
        // Calculate the determinant of the system (cross product of d1 and d2)
        let determinant = d1.x * d2.y - d1.y * d2.x;
        // Solve for the parameter t1 for Line 1
        //let diff = closest_ball.sub(p1); // Vector between the start points of the lines
        //let t1 = (diff.x * d2.y - diff.y * d2.x) / determinant;
        // Calculate the intersection point using t1

        let diff = closest_ball.sub(p1); // Vector between the start points
        let t1 = (diff.x * d2.y - diff.y * d2.x) / determinant;
        let t2 = (diff.x * d1.y - diff.y * d1.x) / determinant;
        // Check if the intersection point lies within both segments

        let Trasled = false
        Trasled = p1.add(d1.mult(t1));







        if (t2 >= 0) {
            if(Trasled)SEE_V(Trasled,'grey') //idk? right direction?
        }

        if (t2 <= 1) {
            if(Trasled)SEE_V(Trasled,'green') //no collision, ??? 
        }


        if (t1 <= 1 && t2 >= 0 && t2 <= 1) {
            if(Trasled)SEE_V(Trasled,'magenta') 
        }
        if (t1 >= 0 && t2 >= 0 && t2 <= 1) {
            if(Trasled)SEE_V(Trasled,'red') 
        }
        if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
            if(Trasled)SEE_V(Trasled,'blue') // perfect intersection
        }





        //if (b==THE_PLAYER) L(t1)
//////////////////////////////////////////////////////////


    let Repos = Trasled? Trasled.add(Lin_sawp) : b.pos

    SEE_L(closest_ball,futur_collP,'grey')

    //SEE_L(b.pos.sub(Lin_sawp),futur_collP.sub(Lin_sawp),'magenta')
    SEE_L(b.pos,futurepos,'green')
    SEE_L(p1,p2,'black')

    
    if(Trasled)SEE_V(Repos,'pink')
    //if(Trasled) b.pos = Repos
    if(Trasled)SEE_L(Trasled,Trasled.add(Lin_sawp))


}

function Line_Ball_3(b, p1, p2) {

    let futurevel = b.vel.mult(1 - b.friction); // Adjust velocity for friction
    let futurepos = b.pos.add(futurevel); // Future position of the ball's center

    // Unit vector for the line segment and its perpendicular

    // Closest point to the line
   
        let intersect = false
        let closestOnSegment = futurepos ////////////////////////////////////7
        let closestOnSegm_on_line = closestPointOnSegment(futurepos, p1, p2);
        // Calculate direction vectors
        let d1 = futurepos.sub(b.pos); // Direction of segment 1
        let d2 = p2.sub(p1); // Direction of segment 2
    
        // Calculate the determinant of the system
        let determinant = d1.x * d2.y - d1.y * d2.x;
        // If determinant is zero, the segments are parallel or coincident
        if (Math.abs(determinant) < 1e-10) {
            // Find the closest point on segment 2 to the end of segment 1
            closestOnSegment = closestPointOnSegment(futurepos, p1, p2);
        }
        // Solve for the parameters t1 and t2
        let diff = p1.sub(b.pos); // Vector between the start points
        let t1 = (diff.x * d2.y - diff.y * d2.x) / determinant;
        let t2 = (diff.x * d1.y - diff.y * d1.x) / determinant;
        // Check if the intersection point lies within both segments
        if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
            // Calculate the intersection point
            let intersection = b.pos.add(d1.mult(t1));
            closestOnSegment = intersection; // Return the intersection point
            closestOnSegm_on_line = intersection
            intersect = true
        }
        // No valid intersection, return the closest point on segment 2 to the end of segment 1

















    // Calculate the vector from the ball's center to the closest point
    let toClosest = closestOnSegment.sub(closestOnSegm_on_line);
    let distToLine = toClosest.mag();
    // Check for overlap or collision
    let collision = distToLine <= b.r;


    let toClosest1 = closestOnSegm_on_line.sub(b.pos);
    let distToLine1 = toClosest1.mag();
    // Check for overlap or collision
    //let collision = distToLine <= b.r;
        // Resolve overlap or penetration
        let penetrationDepth = b.r - distToLine1; // Penetration distance

    SEE_V(toClosest)
    // Visualization
    SEE_L(b.pos, futurepos, 'green'); // Ball's trajectory
    SEE_L(p1, p2, 'black'); // Line segment
    SEE_V(closestOnSegment, 'pink'); // Closest point on the segment
    SEE_V(closestOnSegm_on_line,'magenta')

    if (collision) {
        SEE_V(closestOnSegment,'blue')
        let Newpos = closestOnSegm_on_line.sub(closestOnSegment).unit().mult(-b.r)
        SEE_V(Newpos.add(closestOnSegm_on_line),'green')


        b.pos = Newpos.add(closestOnSegm_on_line)
    }
    if (intersect) {
        let Newpos = closestOnSegm_on_line.sub(futurepos).unit().mult(b.r)
        SEE_V(Newpos.add(closestOnSegm_on_line),'yellow')
        b.pos = Newpos.add(closestOnSegm_on_line)

        SEE_V(closestOnSegm_on_line,'red')
    }

    if (intersect || collision){
    let collisionNormal = toClosest.unit();
    let velocityAlongNormal = b.vel.dot(collisionNormal);
    if (velocityAlongNormal < 0) {
        let restitution = b.elast**2; // Coefficient of restitution
        b.vel = b.vel.sub(collisionNormal.mult((1 + restitution) * velocityAlongNormal));
    }}

}




function Line_Ball_4(b, p1, p2) {
    b.friction = 0.1

    let futurevel = b.vel.mult(1 - b.friction); // Adjust velocity for friction
    let futurepos = b.pos.add(futurevel); // Future position of the ball's center

    let nv = closestCircleLineIntersection(b, p2,p1)

    SEE_L(p1, p2)
    SEE_L(b.pos,futurepos)
    SEE_L(b.pos,nv,'blue')

}









function segmentsDistance(x11, y11, x12, y12, x21, y21, x22, y22) {
    if (segmentsIntersect(x11, y11, x12, y12, x21, y21, x22, y22)) return 0;
    
    const distances = [];
    distances.push(pointSegmentDistance(x11, y11, x21, y21, x22, y22));
    distances.push(pointSegmentDistance(x12, y12, x21, y21, x22, y22));
    distances.push(pointSegmentDistance(x21, y21, x11, y11, x12, y12));
    distances.push(pointSegmentDistance(x22, y22, x11, y11, x12, y12));
    
    return Math.min(...distances);
  }
  
  function segmentsIntersect(x11, y11, x12, y12, x21, y21, x22, y22) {
    const dx1 = x12 - x11;
    const dy1 = y12 - y11;
    const dx2 = x22 - x21;
    const dy2 = y22 - y21;
    const delta = dx2 * dy1 - dy2 * dx1;
    
    if (delta === 0) return false; // parallel segments
    
    const s = (dx1 * (y21 - y11) + dy1 * (x11 - x21)) / delta;
    const t = (dx2 * (y11 - y21) + dy2 * (x21 - x11)) / (-delta);
    
    return (0 <= s && s <= 1) && (0 <= t && t <= 1);
  }
  
  function pointSegmentDistance(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    if (dx === 0 && dy === 0) { // the segment's just a point
      return Math.hypot(px - x1, py - y1);
    }
  
    const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  
    if (t < 0) {
      dx = px - x1;
      dy = py - y1;
    } else if (t > 1) {
      dx = px - x2;
      dy = py - y2;
    } else {
      const nearX = x1 + t * dx;
      const nearY = y1 + t * dy;
      dx = px - nearX;
      dy = py - nearY;
    }
  
    return Math.hypot(dx, dy);
  }





  function lineIntersection(p1, p2, p3, p4) {
    // Line 1: p1 -> p2
    // Line 2: p3 -> p4
    // Calculate the direction vectors of the lines
    let d1 = p2.sub(p1); // Direction of Line 1
    let d2 = p4.sub(p3); // Direction of Line 2
    // Calculate the determinant of the system (cross product of d1 and d2)
    let determinant = d1.x * d2.y - d1.y * d2.x;
    // If determinant is zero, the lines are parallel or collinear
    if (Math.abs(determinant) < 1e-10 && false) {
        return null; // No intersection (parallel or coincident lines)
    }
    // Solve for the parameter t1 for Line 1
    let diff = p3.sub(p1); // Vector between the start points of the lines
    let t1 = (diff.x * d2.y - diff.y * d2.x) / determinant;
    // Calculate the intersection point using t1
    let intersection = p1.add(d1.mult(t1));
    return intersection; // Return the intersection point as a Vec
}









  function point_dist(px, py, x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    
    if (dx === 0 && dy === 0) { // the segment's just a point
      return Math.hypot(px - x1, py - y1);
    }
  
    var t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  
    if (t < 0) {
      dx = px - x1;
      dy = py - y1;
    } else if (t > 1) {
      dx = px - x2;
      dy = py - y2;
    } else {
        var nearX = x1 + t * dx;
        var nearY = y1 + t * dy;
      dx = px - nearX;
      dy = py - nearY;
    }
  
    return {D:Math.hypot(dx, dy),calc:{dx, dy, t,}};
  }



function segmentsInte(x11, y11, x12, y12, x21, y21, x22, y22) {



    const dx1 = x12 - x11;
    const dy1 = y12 - y11;
    const dx2 = x22 - x21;
    const dy2 = y22 - y21;
    const delta = - dx2 * dy1 + dy2 * dx1;
    
    if (delta === 0) return false; // parallel segments
    
    const s = (dx1 * (y21 - y11) + dy1 * (x11 - x21)) / delta;
    const t = (dx2 * (y11 - y21) + dy2 * (x21 - x11)) / (-delta);
    
    return (0 <= s && s <= 1) && (0 <= t && t <= 1);
    

  }



  function closepoint(circle, linePoint1, linePoint2) {
    circle.vel;
    const lineDir = linePoint2.sub(linePoint1); // Direction vector of the line
    const lineToCircle = circle.pos.sub(linePoint1); // Vector from line start to circle center
    // Projection of the line-to-circle vector onto the line's direction
    const t = Vec.dot(lineDir.unit(), lineToCircle);
    // Closest point on the line to the circle's center
    const closestPointOnLine = linePoint1.add(lineDir.unit().mult(t));
    // Distance from the closest point to the circle's center
    const distanceToCircle = closestPointOnLine.dist(circle.pos);
    // Calculate intersection points
    const intersectionDistance = Math.sqrt(circle.r * circle.r - distanceToCircle * distanceToCircle);
    const intersection1 = closestPointOnLine.add(lineDir.unit().mult(intersectionDistance));
    const intersection2 = closestPointOnLine.sub(lineDir.unit().mult(intersectionDistance));
    // Choose the closest intersection point
    const dist1 = intersection1.dist(circle.pos);
    const dist2 = intersection2.dist(circle.pos);

    return {A:intersection1 , B:intersection2,C:MinimumVelocity};
}



function movingCircleSegmentImpact(circle, linePoint1, linePoint2) {
    const lineDir = linePoint2.sub(linePoint1); // Direction vector of the line
    const lineUnitDir = lineDir.unit(); // Normalized direction
    const lineToCircle = circle.pos.sub(linePoint1); // Vector from line start to circle center
    const circleFuturePos = circle.pos.add(circle.vel); // Predicted future position of the circle
    const lineToFutureCircle = circleFuturePos.sub(linePoint1); // Vector from line start to future position

    // Project the line-to-circle vector onto the line's direction
    const t = Vec.dot(lineUnitDir, lineToCircle);
    const tFuture = Vec.dot(lineUnitDir, lineToFutureCircle);

    // Closest point on the line to the circle's current and future positions
    const closestPointNow = linePoint1.add(lineUnitDir.mult(t));
    const closestPointFuture = linePoint1.add(lineUnitDir.mult(tFuture));

    // Distance from the closest points to the circle's current and future centers
    const distanceNow = closestPointNow.dist(circle.pos);
    const distanceFuture = closestPointFuture.dist(circleFuturePos);

    // Check for possible intersections at the current position or during the movement
    const hasImpact = distanceNow <= circle.r || distanceFuture <= circle.r;

    if (!hasImpact) {
        // No collision occurs
        return false;
    }

    // Calculate intersection time using quadratic motion equation
    const relativeVelocity = circle.vel; // Assuming the line segment is static
    const a = relativeVelocity.magSq();
    const b = 2 * Vec.dot(lineToCircle, relativeVelocity);
    const c = lineToCircle.magSq() - circle.r * circle.r;

    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        // No real roots: no intersection
        return false;
    }

    // Calculate the time of impact (TOI)
    const sqrtDiscriminant = Math.sqrt(discriminant);
    const toi1 = (-b - sqrtDiscriminant) / (2 * a);
    const toi2 = (-b + sqrtDiscriminant) / (2 * a);

    // Pick the first valid time of impact
    const toi = toi1 >= 0 && toi1 <= 1 ? toi1 : toi2 >= 0 && toi2 <= 1 ? toi2 : null;

    if (toi === null) {
        // No valid time of impact within the motion range
        return false;
    }

    // Circle's position at the time of impact
    const impactCirclePos = circle.pos.add(relativeVelocity.mult(toi));

    // Point of impact on the segment
    const lineToImpactCircle = impactCirclePos.sub(linePoint1);
    const tImpact = Vec.dot(lineUnitDir, lineToImpactCircle);
    const impactPointOnSegment = linePoint1.add(lineUnitDir.mult(tImpact));

    // Ensure the impact point is within the segment bounds
    const segmentStartToImpact = impactPointOnSegment.sub(linePoint1).mag();
    const segmentLength = lineDir.mag();
    if (segmentStartToImpact < 0 || segmentStartToImpact > segmentLength) {
        // Impact occurs outside the segment
        return false;
    }

    return {
        circleImpactPos: impactCirclePos, // Circle's center position at impact
        segmentImpactPos: impactPointOnSegment // Point of impact on the segment
    };
}


  function Is_ball_5(b,l1,l2) {



    //segment 1 ball + vel
    let futurepos = b.pos.add(b.vel.mult(1))

    let x11 = b.pos.x
    let y11 = b.pos.y
    let x12 = futurepos.x
    let y12 = futurepos.y

    // segment 2 , line
    let x21 = l1.x
    let y21 = l1.y
    let x22 = l2.x
    let y22 = l2.y
    
    let _A  = point_dist(x11, y11, x21, y21, x22, y22)
    let _B  = point_dist(x12, y12, x21, y21, x22, y22)
    let _C  = point_dist(x21, y21, x11, y11, x12, y12)
    let _D  = point_dist(x22, y22, x11, y11, x12, y12)

    const DISTS = [_A,_B,_C,_D];
    DISTS.sort((a,b) => a.D - b.D)
    let winner = DISTS[0]


    let vect_dist = new Vec(winner.calc.dx,winner.calc.dy)
    let intersection = get_point1(b.pos, futurepos, l1, l2)



    // the new vect dist need to be translated along the segment untill it meeat the minimum dista

    SEE_L(l1,l2,'red')
    SEE_L(futurepos,b.pos,'green')
    SEE_L(futurepos,futurepos.sub(vect_dist),rgba(0,0,0,0.1))
    if(winner.D < b.r) {
        
        SEE_L(futurepos,futurepos.sub(vect_dist),'magenta')}


    // logs
    if(Math.random()<0.01 && b == THE_PLAYER && winner.D < b.r){
        L(winner.calc.t)
    }





  }






  function Is_ball_2(b, point1, point2) {
    radius = b.r
    circleX = b.pos.x
    circleY = b.pos.y
    circleVelX = b.vel.x
    circleVelY = b.vel.y
    

    SEE_L(point1,point2,'red')
    SEE_L(b.pos,b.vel.add(b.pos),'blue')



    // Define segment endpoints
    const A = { x: point1, y: point1 };
    const B = { x: point2, y: point2 };

    // Define segment properties
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const segmentLengthSquared = dx * dx + dy * dy;

    // Circle center moves as (circleX + t * circleVelX, circleY + t * circleVelY)
    function computeT() {
        // Set up the quadratic equation for t
        const vx = circleVelX;
        const vy = circleVelY;

        const a = vx * vx + vy * vy; // Coefficient for t^2
        const b = 2 * ((circleX - A.x) * vx + (circleY - A.y) * vy); // Coefficient for t
        const c = (circleX - A.x) ** 2 + (circleY - A.y) ** 2 - radius ** 2; // Constant term

        // Solve the quadratic equation at^2 + bt + c = 0
        const discriminant = b * b - 4 * a * c;

        if (discriminant < 0) {
            return null; // No real solutions => no intersection
        }

        // Calculate the two roots
        const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
        const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

        // We need the smallest non-negative t
        if (t1 >= 0 && t2 >= 0) {
            return Math.min(t1, t2);
        } else if (t1 >= 0) {
            return t1;
        } else if (t2 >= 0) {
            return t2;
        } else {
            return null; // No positive solutions => no valid intersection
        }
    }

    const t = computeT();

    if (t === null &&false) {
        return "No intersection found.";
    }
    // Calculate intersection point on the circle's trajectory
    const circleCenterAtT = {
        x: circleX + t * circleVelX,
        y: circleY + t * circleVelY,
    };
    // Find the closest point on the segment to the circle center at t
    const u = ((circleCenterAtT.x - A.x) * dx + (circleCenterAtT.y - A.y) * dy) / segmentLengthSquared;
    const uClamped = Math.max(0, Math.min(1, u)); // Clamp u to [0, 1]
    const intersection = {
        x: A.x + uClamped * dx,
        y: A.y + uClamped * dy,
    };



    SEE_L(point1,point2,'green')
    SEE_V(intersection)
    SEE_V(circleCenterAtT)

    if (b ==THE_PLAYER)L({
        t,
        intersection,
        circleCenter: circleCenterAtT,
    })
    return {
        t,
        intersection,
        circleCenter: circleCenterAtT,
    };
}

// Example usage















  function closestCircleLineIntersection(circle, linePoint1, linePoint2) {
    const { pos, r } = circle; // Circle center and radius
    const lineDir = linePoint2.sub(linePoint1); // Direction vector of the line
    const lineToCircle = pos.sub(linePoint1); // Vector from line start to circle center

    // Projection of the line-to-circle vector onto the line's direction
    const t = Vec.dot(lineDir.unit(), lineToCircle);

    // Closest point on the line to the circle's center
    const closestPointOnLine = linePoint1.add(lineDir.unit().mult(t));

    // Distance from the closest point to the circle's center
    const distanceToCircle = closestPointOnLine.dist(pos);

    if (distanceToCircle > r) {
        // No intersection: the line is too far from the circle
        return null;
    }

    // Calculate intersection points
    const intersectionDistance = Math.sqrt(r * r - distanceToCircle * distanceToCircle);
    const intersection1 = closestPointOnLine.add(lineDir.unit().mult(intersectionDistance));
    const intersection2 = closestPointOnLine.sub(lineDir.unit().mult(intersectionDistance));

    // Choose the closest intersection point
    const dist1 = intersection1.dist(pos);
    const dist2 = intersection2.dist(pos);

    return dist1 < dist2 ? intersection1 : intersection2;
}





class Poly {
    constructor(x, y) {

        this.depth = 1 // eliminare
        // Global position 
        this.pos = new Vec(x, y); // Poly position (center)
        this.direction = new Vec(0, 0); // Initial direction facing right
        //this.rotation = 0; // Current rotation angle in radians
        this.rel_rot = 0
        this.rotation = Math.random() * 2 * Math.PI

        /// x = lenght, y = width
        this.color = "rgba(50, 50, 50, 0.5)";
        this.bor_col = "rgba(90, 0, 0, 1)";

        this.owner = Object;
        this.bullet = Object;

        this.active = 1
        this.reload = 12
        this.delay = 0
        this.reload_coldown = 0
        this.bl_n = 1
        this.spawn = [];
        this.bl_speed = 12



        ACT.push(this);
        POLYS.push(this);
        DRW_2.push(this);
        this.arrays = [POLYS, ACT, DRW_2]
    }
    shoot() {
        if (this.reload > this.reload_coldown) { this.reload_coldown++ }
        if (0 >= this.active) return;
        if (!this.bullet) {
            this.bullet = defualbullet
            return;
        }
        if (this.reload <= this.reload_coldown) { this.reload_coldown++ }
        if (this.reload_coldown >= this.reload + this.delay) {
            this.reload_coldown -= this.reload
        } else return
        let distance = 56
        let sht_spd = this.bl_speed
        let spread = 0.1
        for (let Count = 0; Count < this.bl_n; Count++) {
            sht_spd += spread * Math.random();
            let spr = (Math.random() - 0.5) * spread

            let dX = Math.cos(this.rotation + spr);
            let dY = Math.sin(this.rotation + spr);


            let b = new this.newclass(this.owner);

            b.pos = new Vec(dX * distance + this.pos.x, dY * distance + this.pos.y);

            let fr_slow = (1 - b.friction - this.owner.friction)

            b.vel.x += dX * sht_spd
            b.vel.y += dY * sht_spd

        }
    }
    drw_2() {
        this.pos = this.owner.pos;
        let scale = this.owner.r * 0.8
        let scale2 = this.owner.r
        let disance = this.owner.r * 0.2

        ctx.save(); // Save the current context
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();

        ctx.arc(0, 0, 1 * scale2, 0.5, -0.5, true);
        ctx.lineTo(1.3 * scale + disance, -0.9 * scale);
        ctx.arc(3 * scale + disance, 0, 0.5 * scale, -2.1, 2.1, true);
        ctx.lineTo(1.3 * scale + disance, 0.9 * scale);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = this.owner.bor_s;
        ctx.strokeStyle = this.bor_col;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0 + disance, 0, 1.4 * scale, 0.5, -0.5, true);
        ctx.lineTo(1.3 * scale + disance, -1 * scale);
        ctx.arc(3 * scale + disance, 0, 0.9 * scale, -2.2, 2.2, true);
        ctx.lineTo(1.3 * scale + disance, 1 * scale);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = this.owner.bor_s;
        ctx.strokeStyle = this.bor_col;
        ctx.stroke();

        ctx.restore(); // Restore the context to avoid affecting other drawings
    }
    act() {
        this.rotation = this.owner.rotation + this.rel_rot
        this.shoot()
    }
}



















// Supporting function: Closest Point on Segment
function closestPointOnSegment(point, segStart, segEnd) {
    let segDir = segEnd.sub(segStart); // Direction of the segment
    let segLengthSq = segDir.dot(segDir); // Segment length squared

    // Handle degenerate case (segment is a single point)
    if (segLengthSq === 0) return segStart;

    // Project the point onto the segment and clamp the result to [0, 1]
    let t = (point.sub(segStart)).dot(segDir) / segLengthSq;
    t = Math.max(0, Math.min(1, t));

    // Return the closest point
    return segStart.add(segDir.mult(t));
}













function WG_Enemy(number, spread) {

    for (let i = 0; i < number; i++) {
        let Gsx = Det_gaussR(0, spread)
        let Gsy = Det_gaussR(0, spread)
        let gl1 = Scale_n(S_ran(1), 0, 255, 1)
        let gl3 = Scale_n(S_ran(1), 0, 255, 1)
        let gl2 = Scale_n(S_ran(1), 0, 255, 1)

        let size = Math.max(30 + (S_ran(1) ** 37) * 400)

        let rscale2 = Scale_n(S_ran(1), -10, 10)
        let mmu = Scale_n(S_ran(1), 3, 10) + 0.5

        let rand4 = S_ran(1) * S_ran(1)
        let rand5 = S_ran(1) * S_ran(1) * S_ran(1) / 2


        let forr6 = Scale_n(S_ran(1), 0, 1, 1)
        let rand6 = Math.abs(Det_gaussR(0, 0.003)) * forr6 + ((1 - forr6))

        let rand7 = Math.abs(Det_gaussR(0, 0.002))
        let rand8 = Math.max(0, S_ran(1) * 7.3 - 6) * S_ran(1) * S_ran(1)


        for (let i = 0; i < S_ran(12) + 2; i++) {

            let NB = new Ball()
            NB.pos.x = Det_gaussR(0, 52) + WG_x + Gsx;
            NB.pos.y = Det_gaussR(0, 52) + WG_y + Gsy;
            NB.r = Math.abs(size * S_ran(2)),
                NB.m = mmu
            NB.inv_m = 1 / NB.m
            NB.elast = rand4
            NB.color = rgba(

                gl1 + rscale2 * 13 * S_ran(1),
                gl2 + rscale2 * 13 * S_ran(1),
                gl3 + rscale2 * 13 * S_ran(1),
                1)
            NB.m *= S_ran(1) * NB.r / 12
            NB.bor_col = rgba(gl1 / 3, gl2 / 3, gl3 / 3, 1)
            NB.vel.x = 0.03
            NB.hard = rand6
            NB.friction = rand5
            NB.slide = rand7
            NB.stk = rand8
            NB.vel.x = (S_ran(1) * 12 - 6)
            NB.vel.y = (S_ran(1) * 12 - 6)


            NB.rotation = S_ran(1) * 12

            NB.owner = NB;
            NB.rank = 1
            NB.team = NB.color


            let HP_scale = (NB.r ** 1.5) * (0.25)

            NB.maxhp = HP_scale;
            NB.hp = Math.min(11100, HP_scale)
            NB.dmg = 1;

            NB.age = 0

            NB.regen = 0.05
            NB.rg_wait = 1
            old_hp = 2220


            NB.act = function act() {
                this.vel._rotate(0.05 * Math.cos(this.age / 223) * Math.random())
                this.vel.x += (Math.random() - 0.5) * Math.cos(this.age / 123) * Math.random() * 12
                this.vel.y += (Math.random() - 0.5) * Math.sin(this.age / 153) * Math.random() * 12
                this.rotation += 1 / gaussianRandom(12, 0.8) * (Math.cos(this.age / (173 + this.vel.x * 12)) * Math.random())
                if (this.hp < this.old_hp) { this.rg_wait = 0 }
                this.hp = Math.min(this.maxhp,
                    this.hp + this.regen + this.regen * this.rg_wait / 128
                )
                this.rg_wait++
                this.old_hp = this.hp


            }
            NB.drw_2 = function drw_2() {
                this.child.forEach((c) => { c.drw_2() })
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
            NB.arrays = [DRW_2, COLLI_BDMG, REPOS, KILLABLE, ACT, DRW_2]
            NB.DIE = DIE_2
            NB.DIE_anim = DIE_anim0

            Array_push(NB)
            ////////// a body a ball?
            if (S_ran() < 0.5) {//aura
                let B = {}
                B.owner = NB
                NB.child.push(B)
                B.size = S_ran(300) + 10
                B.rot_speed = -12
                B.color = rgba_mult(NB.color, 1, 1, 1, 0.1)
                B.bor_col = rgba_mult(NB.color, 2, 2, 2, 0.01)
                B.drw_2 = function () {
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
                B.dmg = 1
                B.arrays = [ACT_L]
                Array_push(B)
                B.act_l = function act() {
                    const cands = rtree.search(nullMBR(this.owner.pos, this.size + this.owner.r));
                    cands.forEach(cand => {
                        if (cand.object.team == this.owner.team || cand.object.rank < this.owner.rank) { return }
                        if (Math.pow(cand.object.r + this.owner.r + this.size, 2) > Math.pow(this.owner.pos.x - cand.object.pos.x, 2) + Math.pow(this.owner.pos.y - cand.object.pos.y, 2)) { }
                        cand.object.hp -= this.dmg
                        cand.object.old_hp -= this.dmg
                    });
                }
            }
            let Dmg_ = Math.floor(S_ran(13 + 20)) - 20
            if (Dmg_ > 2) {
                let B = {}
                B.owner = NB
                NB.child.push(B)
                if (S_ran() > 0.5) {
                    B.rot_speed = 12
                }
                B.rot_speed = -12
                B.color = rgba_mix(rgba(0, 0, 0, 1), NB.color)
                B.bor_col = rgba_mix(rgba(0, 0, 0, 1), NB.bor_col)
                B.spikes = Dmg_
                NB.dmg *= 1 + (Dmg_) / 4
                B.drw_2 = function () {

                    let rotspeed = this.owner.age / this.rot_speed;   // Rotation speed for the star
                    let spikes = this.spikes;             // Number of star spikes
                    let rot = Math.PI / 2 + rotspeed;     // Initial rotation angle with speed
                    let step = Math.PI / spikes;          // Angle step between each spike

                    // Circle and star radii
                    let outerRadius = this.owner.r;       // Outer circle radius
                    let innerRadius = this.owner.r * 1.3; // Inner radius for star points

                    // Draw outer circle

                    // Start a new path for the transparent star cut-out
                    ctx.beginPath();

                    // Move to the first point on the outer radius

                    ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r, rotspeed - 0.0001, P2 + rotspeed, true);
                    x = this.owner.pos.x + Math.cos(rot) * innerRadius;
                    y = this.owner.pos.y + Math.sin(rot) * innerRadius;
                    ctx.lineTo(x, y);
                    rot += step;

                    // Draw the star path
                    for (let i = 0; i < spikes; i++) {
                        // Outer point
                        x = this.owner.pos.x + Math.cos(rot) * outerRadius;
                        y = this.owner.pos.y + Math.sin(rot) * outerRadius;
                        ctx.lineTo(x, y);
                        rot += step;

                        // Inner point
                        x = this.owner.pos.x + Math.cos(rot) * innerRadius;
                        y = this.owner.pos.y + Math.sin(rot) * innerRadius;
                        ctx.lineTo(x, y);
                        rot += step;
                    }

                    ctx.fillStyle = this.color;           // Circle fill color
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    for (let i = 0; i < spikes; i++) {

                        // Outer point
                        x = this.owner.pos.x + Math.cos(rot) * outerRadius;
                        y = this.owner.pos.y + Math.sin(rot) * outerRadius;
                        ctx.lineTo(x, y);
                        rot += step;

                        // Inner point
                        x = this.owner.pos.x + Math.cos(rot) * innerRadius;
                        y = this.owner.pos.y + Math.sin(rot) * innerRadius;
                        ctx.lineTo(x, y);
                        rot += step;
                    }
                    x = this.owner.pos.x + Math.cos(rot) * outerRadius;
                    y = this.owner.pos.y + Math.sin(rot) * outerRadius;
                    ctx.lineTo(x, y);
                    rot += step;


                    ctx.strokeStyle = this.bor_col;
                    ctx.lineWidth = this.owner.bor_s;
                    ctx.strokeStyle = this.bor_col;       // Border color for the circle
                    ctx.stroke();
                    ctx.closePath();

                    // Draw the border for the outer circle (without affecting the star shape)
                    ctx.lineWidth = this.owner.bor_s;
                    ctx.strokeStyle = this.bor_col;       // Border color for the circle
                    ctx.beginPath();
                    ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r, 0, P2, true);
                    ctx.stroke();


                }
            }
            if (true) {

                let B = {}
                B.owner = NB
                NB.child.push(B)
                B.color = NB.color
                B.bor_col = NB.bor_col
                B.spikes = 1

                B.drw_2 = function () {

                    ctx.beginPath();
                    ctx.lineWidth = this.owner.bor_s;
                    ctx.strokeStyle = this.owner.bor_col;       // Border color for the circle
                    ctx.fillStyle = this.owner.color
                    ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r, 0, P2,);
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();


                }
                Array_push(B)

            }
            let SmashHP = Scale_n(S_ran(1), -16, 8, 1)
            if (SmashHP > 0) {
                NB.maxhp *= 1 + SmashHP / 4

                let B = {}
                B.owner = NB
                NB.child.push(B)
                B.r = 44
                B.color = rgba_mix(rgba(255, 255, 255, 1), NB.color)
                B.bor_col = rgba_mix(rgba(177, 177, 177, 1), NB.bor_col)
                B.spikes = SmashHP + 1

                B.drw_2 = function () {

                    let rotspeed = this.owner.age / 71;   // Rotation speed for the star
                    let spikes = this.spikes;             // Number of star spikes
                    let rot = Math.PI / 2 + rotspeed;     // Initial rotation angle with speed
                    let step = Math.PI / spikes;          // Angle step between each spike

                    // Circle and star radii
                    let outerRadius = this.owner.r * 0.9;       // Outer circle radius
                    let innerRadius = this.owner.r * 0.6; // Inner radius for star points

                    // Draw outer circle

                    // Start a new path for the transparent star cut-out
                    ctx.beginPath();

                    // Move to the first point on the outer radius

                    ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r, rotspeed - 0.0001, P2 + rotspeed, true);
                    x = this.owner.pos.x + Math.cos(rot) * innerRadius;
                    y = this.owner.pos.y + Math.sin(rot) * innerRadius;
                    ctx.lineTo(x, y);
                    rot += step;

                    // Draw the star path
                    for (let i = 0; i < spikes; i++) {
                        // Outer point
                        x = this.owner.pos.x + Math.cos(rot) * outerRadius;
                        y = this.owner.pos.y + Math.sin(rot) * outerRadius;
                        ctx.lineTo(x, y);
                        rot += step;

                        // Inner point
                        x = this.owner.pos.x + Math.cos(rot) * innerRadius;
                        y = this.owner.pos.y + Math.sin(rot) * innerRadius;
                        ctx.lineTo(x, y);
                        rot += step;
                    }

                    ctx.fillStyle = this.color;           // Circle fill color
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    for (let i = 0; i < spikes; i++) {

                        // Outer point
                        x = this.owner.pos.x + Math.cos(rot) * outerRadius;
                        y = this.owner.pos.y + Math.sin(rot) * outerRadius;
                        ctx.lineTo(x, y);
                        rot += step;

                        // Inner point
                        x = this.owner.pos.x + Math.cos(rot) * innerRadius;
                        y = this.owner.pos.y + Math.sin(rot) * innerRadius;
                        ctx.lineTo(x, y);
                        rot += step;
                    }
                    x = this.owner.pos.x + Math.cos(rot) * outerRadius;
                    y = this.owner.pos.y + Math.sin(rot) * outerRadius;
                    ctx.lineTo(x, y);
                    rot += step;


                    ctx.strokeStyle = this.bor_col;
                    ctx.lineWidth = this.owner.bor_s;
                    ctx.strokeStyle = this.bor_col;       // Border color for the circle
                    ctx.stroke();
                    ctx.closePath();

                    // Draw the border for the outer circle (without affecting the star shape)
                    ctx.lineWidth = this.owner.bor_s;
                    ctx.strokeStyle = this.bor_col;       // Border color for the circle
                    ctx.beginPath();
                    ctx.arc(this.owner.pos.x, this.owner.pos.y, this.owner.r, 0, P2, true);
                    ctx.stroke();


                }
            }

            let guns = Scale_n(S_ran(1), -31, 5, 1) - Scale_n(S_ran(1), 0, 2, 1)
            for (let i = 0; i < guns; i++) {
                let wp = new Poly(WG_x, WG_y - 112,);
                wp.owner = NB
                wp.bullet = deepClone(defualbullet)
                wp.rel_rot = i * Math.PI / guns * 2
                wp.color = rgba_mix(wp.owner.color, rgba(144, 144, 144, 1), 0.3)
                wp.bor_col = rgba_mix(wp.owner.bor_col, rgba(144, 144, 144, 1), 0.8)
                wp.bor_s = wp.owner.bor_s

                wp.newclass = eval(`
                ID_GEN++;
                class A${ID_GEN} {
                    constructor(owner) {
        
            this.owner = owner
        
            this.rank = this.owner.rank-1;
            this.team = owner.team;
        
        
        
        
            this.child = []
            this.types = [0]
            this.old_x = 0
            this.old_y = 0
            this.friction = 0.01 + Math.random()/77
        
            let fr_slow=(1-this.friction-owner.friction)
            this.vel = new Vec(owner.vel.x*fr_slow   ,owner.vel.y *fr_slow  );
        
            this.r = 0.3*owner.r;
            this.m = 0.1;
            this.inv_m = 1/0.1;
            this.hard =0.0;
            this.elast = 0;
            this.slide = 0
            this.stk = 0
        
            this.age = 0
            this.maxage = 177
            this.hp = 110
            this.maxhp = 110
            this.dmg = 1/4
        
        
        
            this.color = this.owner.color;
            this.bor_col = this.owner.bor_col;
            this.bor_s = Math.log2(this.r+1)/2
        
            KILLABLE.push(this)
            COLLI_BDMG.push(this)
            DRW_2.push(this)
            REPOS.push(this)
            ACT.push(this)
            this.arrays = [KILLABLE,DRW_2,COLLI_BDMG,REPOS,ACT]
                        NB.DIE = DIE_2
            NB.DIE_anim = DIE_anim0
        
        
            /////////// act stats
            this.a_rotat = (Math.random()-0.5)/112
        
                    }
            act(){
            this.r *=1.01
            this.dmg *= 1.01
            this.vel._rotate(this.a_rotat)
            this.a_rotat *= 1.01
            //this.slide +=0.001
            }
            drw_2(){
            drawBlt(this)
            }
                }
                A${ID_GEN};
            `);
                NB.child.push(wp)
            }
            if (true) {
                let wp = {};
                NB.child.push(wp)
                wp.owner = NB
                wp.rel_rot = P2 * S_ran()
                wp.color = rgba_mix(wp.owner.color, rgba(144, 144, 144, 1), 0.3)
                wp.bor_col = rgba_mix(wp.owner.bor_col, rgba(144, 144, 144, 1), 0.8)
                wp.bor_s = wp.owner.bor_s

                wp.bulletsize = S_ran() + 0.1
                wp.b_spead = 0.2 + S_ran() / 2
                wp.width = wp.owner.r * wp.bulletsize
                wp.width2 = wp.width * (1 + S_ran())  // spread
                /////////////////
                wp.disance1 = wp.owner.r * (1 + wp.b_spead)
                wp.disance2 = wp.disance1 + wp.width
                wp.basesize = Math.min(Math.PI / 2, wp.bulletsize)

                wp.newclass = eval(`
                ID_GEN++;
                class A${ID_GEN} {
                    constructor(owner) {
            this.owner = owner
            this.rank = this.owner.rank-1;
            this.team = owner.team;
        
            this.child = []
            this.types = [0]
            
            this.old_x = 0
            this.old_y = 0

            this.friction = 0.01 + Math.random()/77
            this.r = owner.bulletsize
            this.m = 0.1;
            this.inv_m = 1/0.1;
            this.hard =0.0;
            this.elast = 0;
            this.slide = 0
            this.stk = 0
        
            this.age = 0
            this.maxage = 1600 / 30
            this.hp = ${ID_GEN}*100 / 1
            this.maxhp = ${ID_GEN}*100 / 1
            this.dmg = ${ID_GEN}*10 / 1/100
        
            this.color = this.owner.color;
            this.bor_col = this.owner.bor_col;
            this.bor_s = Math.log2(this.r+1)/2
        
            KILLABLE.push(this)
            COLLI_BDMG.push(this)
            DRW_2.push(this)
            REPOS.push(this)
            ACT.push(this)
            this.arrays = [KILLABLE,DRW_2,COLLI_BDMG,REPOS,ACT]
        
            /////////// spawn commands
            this.rel_rot     
            this.start_speed
            this.distance


            let fr_slow=(1-this.friction-owner.friction)
            this.vel = new Vec(owner.vel.x*fr_slow   ,owner.vel.y *fr_slow  );
            this.pos = new Vec(owner.vel.x*fr_slow   ,owner.vel.y *fr_slow  );
 




        
            /////////// act stats
            this.a_rotat = (Math.random()-0.5)/112
        
                    }
            act(){
            this.r *=1.01
            this.dmg *= 1.01
            this.vel._rotate(this.a_rotat)
            this.a_rotat *= 1.01
            //this.slide +=0.001
            }
            drw_2(){
            drawBlt(this)
            }
                }
                A${ID_GEN};
            `);

                wp.drw_2 = function () {


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

            }

            //auto turrets //defensive and offensive

            //sides auto turrets

            //exposion on death

            //invisibility

            //attracion aurea //bullet aura

            //drones

        }
    }


}






let guns = Scale_n(S_ran(1), -312, 5, 1) - Scale_n(S_ran(1), 0, 2, 1)
for (let i = 0; i < guns; i++) {
    let wp = new Poly(WG_x, WG_y - 112,);
    wp.owner = NB
    wp.rel_rot = i * Math.PI / guns * 2
    wp.color = rgba_mix(wp.owner.color, COL.gun, 0.3)
    wp.bor_col = rgba_mix(wp.owner.bor_col, COL.gun)
    wp.bor_s = wp.owner.bor_s

    wp.newclass = eval(`
    ID_GEN++;
    class A${ID_GEN} {
        constructor(owner) {

this.owner = owner

this.rank = this.owner.rank-1;
this.team = owner.team;




this.child = []
this.types = [0]
this.old_x = 0
this.old_y = 0
this.friction = 0.01 + Math.random()/77

let fr_slow=(1-this.friction-owner.friction)
this.vel = new Vec(owner.vel.x*fr_slow   ,owner.vel.y *fr_slow  );

this.r = 0.3*owner.r;
this.m = 0.1;
this.inv_m = 1/0.1;
this.hard =0.0;
this.elast = 0;
this.slide = 0
this.stk = 0

this.age = 0
this.maxage = 177
this.hp = 110
this.maxhp = 110
this.dmg = 1/4



this.color = this.owner.color;
this.bor_col = this.owner.bor_col;
this.bor_s = Math.log2(this.r+1)/2

KILLABLE.push(this)
COLLI_BDMG.push(this)
DRW_2.push(this)
REPOS.push(this)
ACT.push(this)
this.arrays = [KILLABLE,DRW_2,COLLI_BDMG,REPOS,ACT]
        this.DIE = DIE_2
this.DIE_anim = DIE_anim0

/////////// act stats
this.a_rotat = (Math.random()-0.5)/112

        }
act(){
this.r *=1.01
this.dmg *= 1.01
this.vel._rotate(this.a_rotat)
this.a_rotat *= 1.01
//this.slide +=0.001
}
drw_2(){
drawBlt(this)
}
    }
    A${ID_GEN};
`);
    NB.child.push(wp)
}












            ///////// guns
            let BL_HP = S_ran(50)
            let BL_ranDir = (S_ran())
            let BL_DMG = S_ran(2)+0.01
            let BL_AGE = S_ran(600)
            let BL_COUNT = 1+Math.trunc(5*S_ran(1)**5)
            let BL_RELOAD = S_ran(150)+3
            let BL_ranVel = (S_ran(60))
            let BL_SPEE = S_ran(30)
            let b_size = 1/8 + S_ran(0.4)
            for (let i = 0; i < 1; i++) {


            L(NB)
            let rel_rot = 0 //(i2)*P2/(Main-1)/Gun_sepa
            let FREPOWER = (BL_DMG*BL_HP)/BL_RELOAD*Math.abs(BL_COUNT)
            let SpecialCost = BL_SPEE + 10/(BL_ranDir+1)
            let Perform_cost = BL_COUNT*(BL_AGE*0.2)/(BL_RELOAD*2)
            
            if(Perform_cost>5){
                L("TROPPPPPSPSPSP:"+Perform_cost)
                BL_RELOAD*=Perform_cost
                FREPOWER = (BL_DMG*BL_HP)/BL_RELOAD*Math.abs(BL_COUNT)
                Perform_cost = BL_COUNT*(BL_AGE*0.2)/(BL_RELOAD*2)
            }

            L("firepowe:"+FREPOWER)
            L("Special_cost:"+SpecialCost)
            L("Perform_cost:"+Perform_cost)

            BL_DMG*=1/FREPOWER


            FREPOWER = (BL_DMG*BL_HP)/BL_RELOAD*Math.abs(BL_COUNT)
            L("firepowe2:"+FREPOWER)


            let wp = {};
            NB.child.push(wp)
            wp.owner = NB
            wp.rel_rot = rel_rot
            wp.color = rgba_mix(wp.owner.color, COL.gun, 0.3)
            wp.bor_col = rgba_mix(wp.owner.bor_col, COL.gun, 0.8)
            wp.bor_s = wp.owner.bor_s

            //////////// shooting:
            wp.recoil = -12
            wp.reload = BL_RELOAD
            wp.reload_coldown = BL_RELOAD
            wp.delay = 0
            wp.active = 1
            wp.bl_n = BL_COUNT
            wp.b_stats = {
                friction : 0.01 + Math.random()/77,
                r : b_size,
                m : 0.1,
                inv_m : 1/0.1,
                hard : 0.0,
                elast : 0,
                slide : 0,
                stk : 0,
                maxage : BL_AGE,
                hp :BL_HP,
                maxhp :BL_HP,
                dmg :BL_DMG,
                arrays : [KILLABLE,DRW_2,COLLI_BDMG,REPOS],
                ran_rot : BL_ranDir,
                ran_vel : BL_ranVel,
                rel_rot : rel_rot,
                rel_dis : BL_SPEE/30,
                rel_vel : BL_SPEE
            }
            /////////// Drawing:
            wp.disance1 = wp.owner.r + wp.owner.r * (wp.b_stats.rel_vel/30) //* ((Main/2-Math.abs(i2))/2+1)
            wp.disance2 = wp.disance1 + wp.owner.r * (wp.b_stats.ran_vel/60)
            wp.width = wp.owner.r * wp.b_stats.r
            wp.width2 = wp.width + wp.b_stats.ran_rot * (wp.b_stats.ran_vel/60) * wp.owner.r  // spread
            wp.basesize = Math.min(Math.PI / 2, wp.b_stats.r)
            ////////// updating
            wp.og_ow_r = wp.owner.r
            wp.draw_update = function(){
                let newR = this.owner.r/wp.og_ow_r
                this.width *= newR
                this.width2 *= newR
                this.disance1 *= newR
                this.disance2 *= newR
                this.og_ow_r = this.owner.r
            }
            wp.drw_2 = function () {
                if(this.og_ow_r != this.owner.r){this.draw_update()}




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
            wp.act = comb_func(F_o_Shoot2)
            wp.arrays = [ACT,DRW_2]
            wp.DIE = DIE_2
            wp.DIE_anim = DIE_anim0
            Array_push(wp)
        }