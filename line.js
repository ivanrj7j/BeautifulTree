class Branch{
    constructor(x, y, len, angle, iteration, depth, lengthDampening, angleDampening, branches, startColor, endColor){
        this.x = x;
        this.y = y;
        this.len = len;
        this.angle = angle;
        this.xDash = (Math.cos(angle) * len) + x;
        this.yDash = (Math.sin(angle) * len) + y;
        this.iteration = iteration;
        this.depth = depth;
        this.lengthDampening = lengthDampening;
        this.angleDampening = angleDampening;
        this.branches = branches;
        this.startColor = startColor;
        this.endColor  = endColor;
    }

    draw(){
        let [r1, g1, b1] = this.startColor;
        let [r2, g2, b2] = this.endColor;

        let ratio = this.colorFunction(this.iteration/(this.depth - 1));

        let dr = (r2 - r1) * ratio;
        let dg = (g2 - g1) * ratio;
        let db = (b2 - b1) * ratio;


        let r = r1 + dr;
        let g = g1 + dg;
        let b = b1 + db;
        let a = 1 - (0.95*ratio);

        stroke(r, g, b, a*255);
        strokeWeight(3.5*Math.max(0.1, 1-ratio))
        line(this.x, this.y, this.xDash, this.yDash);
        this.branch();
    }

    branch(){
        if(this.iteration < this.depth-1){
            const newAngle = this.angle * this.angleDampening;
            const newLength = this.lengthDampening * this.len;

            for (let i = 0; i < this.branches; i++) {
                const displacement = PI / Math.pow(2, Math.max(1, i));
                let branchAngle  = newAngle;

                if(i > 0){
                    branchAngle -= displacement;
                }

                const branch = new Branch(this.xDash, this.yDash, newLength, branchAngle, this.iteration+1, this.depth, this.lengthDampening, this.angleDampening, this.branches, this.startColor, this.endColor);
                branch.draw();
            }
        }
    }

    colorLogisticFunction(x){
        const s = 1.3;
        const k = 1.3;

        return 1 / (1+Math.exp(s*(k-x)));
    }

    colorFunction(x){
        const l0 = this.colorLogisticFunction(0);
        return (this.colorLogisticFunction(x) - l0)/(this.colorLogisticFunction(1) - l0);
    }
}