//TEMPORALES al logearse copie el valor del usuario a un temporal
var temporal = {
  usuario: '',
  peso: 0,
  altura: 0,
  enfermedad: ''
};
var objetivo = 2000;
var quemadas = 0;

function setQuemadas(numero){
  this.quemadas+= numero;
}

function getQuemadas(){
  return quemadas;
}

angular.module('app.controllers', [])
.controller('logearCtrl', function($scope, $state, $http, $sce) {
	$scope.submit= function(){
    var nombre = $scope.nombre;
    var pass = $scope.password;
    var url = 'http://urlifemine.esy.es/index.php/usuarios/'+nombre;
    var postUrl = $sce.trustAsResourceUrl(url);
    $http.get(postUrl)
    .then(function(response) {
      if(nombre == response.data.usuario && pass == response.data.contra){
        temporal.usuario = response.data.usuario;
        temporal.peso = response.data.peso;
        temporal.altura = response.data.altura;
        temporal.enfermedad = response.data.alergia;
        $state.go('panel.principal');
      }else{
        alert("Password Incorrecta");
      }
    });
  };
})

.controller('registrarseCtrl', function($scope, $http, $sce, $ionicActionSheet) {
  $scope.guardarUsuario = function() {
    var cabeceras = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    $http.defaults.headers.post = cabeceras;
    var nuevoUsuario = {
      nombre: "Carlos",
      apellidos: "Carrera",
      usuario: "buryme",
      contra: "root",
      correo: "audi@gmail.com",
      fechaNacimiento: "01/01/1980",
      sexo: "Masculino",
      peso: 80,
      altura: 178,
      objetivo: "Perder peso",
      enfermedadSeleccionada:{
        nombre: "No hay",
        tipo: "No hay tipo"
      }
    };
    var url = 'http://urlifemine.esy.es/index.php/usuarios';
    var postUrl = $sce.trustAsResourceUrl(url);
    $http.post(url, nuevoUsuario).success(function(data, status, headers, config){
      alert("Usuario Creado");
    }).error(function(){
      alert("Error con el servidor");
    });
  };
  $scope.nombreBotonSexo = "Sexo";
  $scope.boton=function() {
    $ionicActionSheet.show({
      titleText:'Escoger sexo',
      buttons:[{text:'<i class="ion-male">Masulino</i>'},
      {text:'<i class="ion-female">Femenino</i>'}],
      buttonClicked:function(index){
        if(index === 0){
          $scope.nombreBotonSexo="Masculino";
        }
        if(index == 1){
          $scope.nombreBotonSexo="Femenino";
        }
        $scope.registro.sexo=$scope.nombreBotonSexo;
        return true;
      }
    });
  };
  $scope.botonObjetivoText="Objetivo";
  $scope.enfermedades = [{
    nombre:"Cardiovascular",
    tipo:"Enfermedad"
    },{
      nombre: "Respiratoria",
      tipo: "Enfermedad"
    },{
      nombre : "Piel",
      tipo: "Alergias"
    },{
        nombre: "Ninguno",
        tipo: "No presenta alergias o enfermedad"
  }];
  $scope.botonObjetivo = function() {
    $ionicActionSheet.show({
      titleText:'Objetivo que desea',
      buttons:[{text:'Perder peso'},
      {text:'Mantener peso'},
      {text:'Ganar masa muscular'}],
      buttonClicked:function(index) {
        if(index === 0){
          $scope.botonObjetivoText="Perder peso";
        }
        if(index == 1){
          $scope.botonObjetivoText="Mantener peso";
        }
        if(index == 2){
          $scope.botonObjetivoText="Ganar masa muscular";
        }
        $scope.registro.objetivo= $scope.botonObjetivoText;
        return true;
      }
    });
  };
})

.controller('principalCtrl', function($scope, $http) {
  var fecha = document.getElementById("principal-markdown1");
  var f = new Date();
  var fecha_actual = f.getDate()+"/"+(f.getMonth()+1)+"/"+f.getFullYear();
  fecha.textContent = "Fecha: "+fecha_actual;
  var obj= document.getElementById("objetivo");
  obj.textContent = objetivo;
  var cal_quemadas = document.getElementById("cal_quemadas");
  if(objetivo - getQuemadas() === 0){
    cal_quemadas.textContent = "Buen trabajo";
  }else{
    cal_quemadas.textContent = objetivo - getQuemadas();
  }
  //ÉSTO ES PARA EL USUARIO
  $scope.nombre = temporal.usuario;
})

.controller('monitoreoCtrl', function($scope) {
  $scope.nombre = temporal.usuario;
  $scope.imc = temporal.peso / ((temporal.altura*temporal.altura)/10000);
  $scope.alergia = registroUsuario.padecimiento;
  if($scope.imc < 18){
    $scope.padecimiento = "Peso bajo desnutricion";
  }else if($scope.imc >= 18 && $scope.imc < 14.9){
    $scope.padecimiento = "Peso normal";
  }else if($scope.imc >= 24.9 && $scope.imc <= 26.9){
    $scope.padecimiento = "Sobre peso";
  }else if($scope.imc > 27){
    $scope.padecimiento = "Obesidad";
  }
})

.controller('dietasCtrl', function($scope) {
  
})
   
.controller('lugaresCtrl', function($scope) {

})
      
.controller('inicioCtrl', function($scope) {

})
   

.controller('ajustesCtrl', function($scope) {

})
   
.controller('retosCtrl', function($scope) {
  $scope.nombre = temporal.usuario;
  $scope.imc = temporal.peso / ((temporal.altura*temporal.altura)/10000);
  $scope.problema = temporal.enfermedad;
  if($scope.imc < 18){
    $scope.padecimiento = "Peso bajo desnutricion";
  }else if($scope.imc >= 18 && $scope.imc < 14.9){
    $scope.padecimiento = "Peso normal";
  }else if($scope.imc >= 24.9 && $scope.imc <= 26.9){
    $scope.padecimiento = "Sobrepeso";
  }else if($scope.imc > 27){
    $scope.padecimiento = "Obesidad";
  }
})


.controller("MapController", function($scope){
  registroUsuario = {};
  $scope.mostrar = function(){
    google.maps.event.addDomListener(window, "load", function(){
      var myLatlng = new google.maps.LatLng(17.077560, -96.744422);
      var mapOption = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      $scope.map = new google.maps.Map(document.getElementById("map"), mapOption);
    });
  }
})
   
.controller('registrarse2Ctrl', function($scope,$ionicActionSheet) {
  
})
   
   
.controller('eMPEZAREJERCICIOCtrl', function($scope) {

})
   
.controller('aPRENDIZAJECtrl', function($scope) {

})
   
.controller('lOGROSALCANZADOSCtrl', function($scope) {

})
   
.controller('secciNDeDietasCtrl', function($scope, $ionicPopup) {
  var ingredientes = "1 cucharadita de aceite vegetal (1 cucharada extra si los fríes)<br>"+
  ".5 libras de carne molida de pollo sin grasa<br>½ cebolla picada<br>1 zanahoria rallada<br>"+
  "¼ de col rallada<br>1 diente de ajo picado finamente<br>1 cucharada de salsa de ostras<br>"+
  "1 cucharada de soya<br>½ cucharadita de jengibre en polvo<br>12 envolturas de egg rolls<br>"+
  "Opcional: 1 cucharada de cilantro fresco";
  var instrucciones = "Calienta una cucharada de aceite vegetal en un sartén mediano. Agrega el pollo, cebolla, y ajo y cocina por 3-5 minutos hasta que se empiecen a dorar. Agrega la col y la zanahoria y cocina por 3-5 minutos más hasta que se empiecen a suavizar. Vierte y mezcla la salsa de ostras, alza de soya, y jengibre en polvo y cocina por 2-3 minutos para que se combinen los sabores. Asegúrate de que el pollo este completamente cocido.<br>Deja que la mezcla se enfrié un poco. Opcional: Mezcla con el cilantro.<br>Para armar los rollos, pon ⅓ de taza de la mezcla en el centro de cada envoltura. Dobla como indiquen las instrucciones en el paquete – básicamente jala una esquina sobre el relleno, dobla los lados hacia adentro y enrolla. Moja la esquina con agua y sella el rollo.<br>1er opción Hornea los rollos: Precalienta el horno a 400 grados. Hornea los rollos por 12-15 minutos hasta que se empiecen a dorar, voltéalos una vez. Para que queden más crujientes, ponlos bajo la parrilla por 1-2 minutos de cada lado. <br> 2da opción –Fríe los rollos: Calienta una cucharada de aceite vegetal sobre fuego medio. Agrega 4-5 rollos a la vez y fríe. Voltéalos con pinzas cuando sea necesario. Ten cuidado porque se cocinan muy rápido y se pueden quemar muy fácilmente. Voltéalos en cuanto se empiecen a dorar y a tener burbujas. Son de 2 puntos cada uno, o 7 puntos por 3 si los fríes.";
  var informacion = "Tamaño de la Porción: 3 egg rolls<br>Calorías: 268<br>Grasa: 5.7<br>Carbohidrátos: 37<br>Fibra: 2<br>Proteína: 18";
  var ingredientes2 = "1.5 libras de pechugas de pollo (aprox. 4 onzas cada una), delgadas<br>½ taza de pan molido integral<br>4 claras de huevo<br>1 cucharada de albahaca fresca picada<br>1 cucharada de orégano<br>1 cucharada de ajo en polvo<br>½ taza de queso parmesano rallado<br>Sal y pimienta recién molida";
  var instrucciones2 = "Precalienta el horno a 400 grados.<br>En un tazón mezcla el pan molido, albahaca, orégano, ajo en polvo, queso parmesano, sal, y pimienta.<br>Pon las claras de huevo en otro tazón.<br>Espolvorea las pechugas con sal y pimienta. Sumérgelas en huevo y deja que escurra. Con cuidado revuelca las pechugas en el pan molido hasta que queden cubiertas. Rocía una charola para hornear con aceite antiadherente y coloca las pechugas en la charola.<br>Hornea por 20 minutos hasta que el pollo quede completamente cocido.";
  var informacion2 = "Tamaño de la Porción: una pieza de pollo<br>Calorías: 204<br>Grasa: 4.5<br>Carbohidrátos: 5.5<br>Fibra: 1<br>Proteína: 33";
  $scope.primera_ingredientes = function(){
    $ionicPopup.alert({
      title: 'Ingredientes',
      template: ingredientes
    });
  };
  $scope.primera_instrucciones = function(){
    $ionicPopup.alert({
      title: 'Instrucciones',
      template: instrucciones
    });
  };
  $scope.primera_informacion = function(){
    $ionicPopup.alert({
      title: 'Información',
      template: informacion
    });
  };
  $scope.segunda_ingredientes = function(){
    $ionicPopup.alert({
      title: 'Ingredientes',
      template: ingredientes2
    });
  };
  $scope.segunda_instrucciones = function(){
    $ionicPopup.alert({
      title: 'Instrucciones',
      template: instrucciones2
    });
  };
  $scope.segunda_informacion = function(){
    $ionicPopup.alert({
      title: 'Información',
      template: informacion2
    });
  };
})
   
.controller('ubicacionesCtrl', function($scope) {

})
   
.controller('menusCtrl', function($scope) {

})

//-------------------------------

.controller('rutinaCtrl', function($scope) {

})
   
.controller('catLogoCtrl', function($scope) {

})
   
.controller('estiramientoCtrl', function($scope) {
  setQuemadas(100);
})
   
.controller('estiramiento2Ctrl', function($scope) {
  setQuemadas(100);
})
   
.controller('estiramiento3Ctrl', function($scope) {
  setQuemadas(100);
})
   
.controller('zancadasCtrl', function($scope) {
  setQuemadas(200);
})
   
.controller('flexionesCtrl', function($scope) {
  setQuemadas(300);
})
   
.controller('twistRusoCtrl', function($scope) {
  setQuemadas(300);
})

.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});