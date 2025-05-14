const obj = {
    name: "pippo",
    sayHello: ()=>{
        console.log("hello " + this.name); //prende il this di global, prende lo scope di ocnstant object
    }
}
obj.sayHello(); //undefined

const obj2 = {
    name: "pippo",
    sayHello: function(){
        console.log("hello " + this.name);//
    }
}
obj2.sayHello();//funziona