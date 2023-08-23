import * as THREE from 'three';

export class Paratrooper{
    constructor(
        position,
         velocity,
         acc,
         m,
         wind_veolcity,
         wind_angle,
         y,
         h_crossSectionalArea,
         total_Cd,
    ){
        this.position=position;
        this.velocity=new THREE.Vector3(0,0,0);
        this.acc=acc;
        this.rho=1.2;
        this.crossSectionalArea = 20;//m^2
        this.total_crossSectionalArea = h_crossSectionalArea;//m^2
        this.h_crossSectionalArea=h_crossSectionalArea;//m^2
        this.Cd=0.7;
        this.total_Cd=total_Cd;
        this.m=m;//kg
        this.g=9.8;
        this.wind_veolcity=wind_veolcity;
        this.wind_angle=wind_angle;
        this.y=y
        this.air_force   
        this.grav_force
        this.winde_force
        this.total_force 
        this.Pull_force 
        this.acc 
        this.velocity 
        this.i =40
        this.open_parachute =false
        this.pull_Forward =false
        this.pull_Left =false
        this.pull_Right =false
    }
    update(deltaTime){
        
        let air_force = this.airResistance()
        let grav_force = this.W()
        let winde_force = this.calculateWindForce()
        let Pull_force = this.pull()
        this.air_force   = air_force
        this.grav_force  = grav_force
        this.winde_force = winde_force
        this.Pull_force = Pull_force
        
        // let total_force =new THREE.Vector3(
            //     air_force.x + grav_force.x + winde_force.x,
            //     air_force.y + grav_force.y + winde_force.y,
            //     air_force.z + grav_force.z + winde_force.z,
            // )
let total_force =new THREE.Vector3(
    grav_force.x +air_force.x + winde_force.x + Pull_force.x,
    grav_force.y +air_force.y + winde_force.y + Pull_force.y,
    grav_force.z +air_force.z + winde_force.z + Pull_force.z,
    )

        this.total_force = total_force

    // console.log("total_force  ", total_force)
    // console.log("winde_force 111111 ", winde_force)

let acc = new THREE.Vector3(
    total_force.x/this.m,
    total_force.y/this.m,
    total_force.z/this.m,
)
this.acc = acc
// console.log("acc    ",acc)

// console.log("velocity 111     ", this.velocity )

// console.log("aaaaaaaaaaa      ", acc.y , deltaTime , this.velocity.y , acc.y * deltaTime + this.velocity.y )
this.velocity.x +=  acc.x * deltaTime;
this.velocity.y +=  acc.y * deltaTime;
this.velocity.z +=  acc.z * deltaTime;


this.position.x += this.velocity.x*deltaTime;
this.position.y += this.velocity.y*deltaTime;
this.position.z += this.velocity.z*deltaTime;

// console.log("velocity 222     ", this.velocity )

}

    
            W() {
                let w_f = new THREE.Vector3(0, -this.m * this.g, 0)
                // console.log( "gravity  ",         w_f)
                return w_f;
                }



            airResistance() {
                const v_relative_horizontal = Math.sqrt(this.velocity.x * this.velocity.x  +this.velocity.y * this.velocity.y +this.velocity.z * this.velocity.z);
                // const v_relative_vertical = this.velocity.yi
                // console.log("  XXXXX    ", v_relative_horizontal)
                // const alpha = Math.atan2(v_relative_vertical, v_relative_horizontal);
                // const beta = Math.atan2(this.velocity.y, v_relative_horizontal);
                let mediator = new THREE.Vector3(this.velocity.x,this.velocity.y,this.velocity.z)
                let normalize = mediator.normalize()
                // console.log("xxxxxxxxxxx    ",this.velocity )

                let fd = new THREE.Vector3(
                    -0.5 * this.rho * this.total_crossSectionalArea* this.total_Cd * Math.pow(v_relative_horizontal, 2) *normalize.x,
                    -0.5 * this.rho * this.total_crossSectionalArea* this.total_Cd * Math.pow(v_relative_horizontal, 2) * normalize.y,
                    -0.5 * this.rho * this.total_crossSectionalArea* this.total_Cd * Math.pow(v_relative_horizontal, 2) * normalize.z
                    );
                    if(this.open_parachute){
                        if(this.i > 0){
                            fd.y = fd.y / this.i
                            this.i --
                        }
                        
                    }
                    // console.log(" airResistance    " , fd)
                return fd;
            }

            ////////// Wind Direction /////////
             calculateWindForce() {


                let Wind_Force = new THREE.Vector3(
                    this.wind_veolcity * Math.cos(this.wind_angle),
                     0,
                     this.wind_veolcity * Math.sin(this.wind_angle),
                )
                // var axis = new THREE.Vector3(0, 1, 0);
                // var wind_angle = Math.PI / 2; // 90 degrees
                // vector.applyAxisAngle(axis, theta);
                return Wind_Force;
              }

              printConsole(){
                    console.log(" air_force       " ,   this.air_force  )
                    // console.log(" grav_force      " ,   this.grav_force )
                    // console.log(" winde_force     " ,   this.winde_force)
                    // console.log("   Pull_force      " ,   this.Pull_force )
                    // console.log("   total_force       " ,   this.total_force )
                    console.log("   acc       " ,   this.acc )
                     console.log("   velocity       " ,   this.velocity .y)

              }


              pull(){
                  let pull = new THREE.Vector3(0,0,0)

                if(this.pull_Forward){
                    pull.z = 3300
                    console.log("      Forward ")
                    this.pull_Forward = false
                }

                if(this.pull_Left){
                    pull.x = -3300
                    console.log("    Left ")

                    this.pull_Left = false
                }

                if(this.pull_Right){
                    pull.x = 3300
                    console.log("    Right ")

                    this.pull_Right = false
                }

                    return pull
              }




             

            
}