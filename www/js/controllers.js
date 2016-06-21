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
   
.controller('secciNDeDietasCtrl', function($scope) {

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