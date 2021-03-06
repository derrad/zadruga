(function () {
    "use strict";

angular.module("ZADRUGA.controllers", [])
.controller("homeCtrl", ["$scope", "$rootScope", "appConfig",
                     function ($scope, $rootScope, appConfig) {
                   
        $scope.titleHome = "HOME";


}])
.controller("menuCtrl", ["$scope", "$rootScope", "appConfig",
                     function ($scope, $rootScope, appConfig) {
     

 this.index = 0;
    this.eventIndex = 0;

    this.setIndex = function (val) {
        this.index = val;
       // console.log("called")
    }

    this.getIndex = function () {
        return (this.index);
    }

    this.setEventIndex = function (val) {
        this.eventIndex = val;
    }
    this.getEventIndex = function () {
        return (this.eventIndex);
    }

}])
.controller("vlasnikCtrl", ["$scope", "$rootScope","$resource", function ($scope, $rootScope, $resource) {

    var Vlasnik = $resource('/api/vlasnik');
  
    Vlasnik.query(function (results) {
        $scope.vlasnik = results;
      //  debugger;
      //  $scope.Ime = results.Ime;
    }); 
    $scope.vlasnik =[]; 
  
    $scope.createVlasnik = function () {
        var vlasres = new Vlasnik();

        vlasres.Ime = $scope.Ime;
        vlasres.Adresa = $scope.Adresa;
        vlasres.Mesto=$scope.Mesto;
        vlasres.PttReon =$scope.PttReon  ; 
        vlasres.PttPak  =$scope.PttPak ;
        vlasres.Direktor = $scope.Direktor;
        vlasres.KomRukovac =$scope.KomRukovac;
        vlasres.Blagajnik =$scope.Blagajnik;
        vlasres.Pib =$scope.Pib;
        vlasres.MatBroj = $scope.MatBroj;
        vlasres.SifDelat =$scope.SifDelat;
        vlasres.PdvBroj=$scope.PdvBroj;
        vlasres.Sud =$scope.Sud;
        vlasres.UplRacPorJed=$scope.UplRacPorJed;
        vlasres.NazPorJed= $scope.NazPorJed;
       
       
        vlasres.$save(function (result) {
       

        // $scope.meetupName = '';
        // $scope.ptt='';


        });
    } 
    
        $scope.title = "Vlasnik";
       

        $scope.InitApp = function () {



        };


        $scope.InitApp();


}])
.controller("posaoCtrl", ["$scope", "$rootScope","$resource", function ($scope, $rootScope, $resource) {

    var Posao = $resource('/api/posao');
  
    Posao.query(function (results) {
        $scope.posao = results;
      //  debugger;
      //  $scope.Ime = results.Ime;
    }); 
    $scope.posao =[]; 

    $scope.Sprema = ['Nekvalifikovan', 'Polukvalifikovan', 'Kvalifikovan','Srednja Strucna Sprema','VKV','Visa skola','Fakultet','Magistar','Doktor Nauka'];
    $scope.SelectSprema = '';
  
    $scope.createPosao = function () {
        $scope.loginLoading = true;

        var posres = new Posao();

        posres.Naziv = $scope.Naziv;
        posres.StepenSS = $scope.SelectSprema;
        posres.Skola=$scope.Skola;
        posres.Sifra =$scope.Sifra  ; 
        posres.Sifra1  =$scope.Sifra1 ;
        posres.Opis = $scope.Opis;
            
       
        posres.$save(function (result) {

            //debugger;
            if(result.errors){
                //alert("Error Error");
                $scope.ShowError(result.errors);
            }else{
            $scope.posao.push(result); 

            $scope.Naziv='';
            $scope.SelectSprema = '';
            $scope.Skola='';
            $scope.Sifra=''  ; 
            $scope.Sifra1='' ;
            $scope.Opis='';
           
            }
            $scope.loginLoading = false;

        });
    } 
    
    $scope.title = "Poslovi";

    $scope.ShowError = function(terror){
        debugger;
        if(terror){
            if(terror.StepenSS){
                alert("Greska " + terror.StepenSS.message);
            }


        }

    }
       



}])
.controller("drzaveCtrl", ["$scope", "$rootScope","$resource", function ($scope, $rootScope, $resource) {

   // var DRZAVA = $resource('/api/drzave');
    console.log("Evo me u drzavama");
    var DRZAVA = $resource('/api/drzave' ,null,
    {
        'query':  {method:'GET', isArray:false}
    });

    DRZAVA.query(function (results) {
        $scope.drzave = results.data;
      //  debugger;
      //  $scope.Ime = results.Ime;
    }); 
     
    $scope.createDrzavu = function () {
        $scope.loginLoading = true;

        var DrzaveRes = new DRZAVA();


        DrzaveRes.Naziv = $scope.Naziv;
        DrzaveRes.KodDrzave = $scope.KodDrzave;
        DrzaveRes.NameUser='System';
        DrzaveRes.Opis = $scope.Opis;
            
       
        DrzaveRes.$save(function (result) {

           // debugger;
            if(result.errors){
                alert("Error Error");
                $scope.ShowError(result.errors);
            }else{
            $scope.drzave.push(result); 

            $scope.Naziv='';
            $scope.KodDrzave = '';
            $scope.NameUser='';
            $scope.Opis='';
           //debugger;
            }
            $scope.loginLoading = false;

        });
    } 
    
    $scope.title = "Drzave";

    $scope.ShowError = function(terror){
        debugger;
        if(terror){
            // if(terror.StepenSS){
            //     alert("Greska " + terror.StepenSS.message);
            // }

            alert("Greska drzave !!!")
        }

    }
       



}])
.controller("ActivCtrl", ["$scope", "$rootScope","$resource", function ($scope, $rootScope, $resource) {
    
        console.log("usao u kontroler");
        var Activity = $resource('/api/activities' ,null,
        {
            'query':  {method:'GET', isArray:false}
        });
      
        console.log("iza resursa  u kontroleru");

        $scope.PODACI = [];

        //https://stackoverflow.com/questions/28156121/using-resource-query-i-want-to-return-an-object-that-contains-an-array-of-the
        
        // Activity.query().$promise.then(function(results) {
        //     // success
        //     $scope.PODACI = results;
        //  }, function(errResponse) {
        //     // fail
        //     console.log(errResponse);
        //  });

         Activity.query(function (results) {
        //     console.log("query " + results);
            $scope.PODACI = results.data;
        //   //  debugger;
        //   //  $scope.Ime = results.Ime;
        }); 
                     
        $scope.title = "AKTIVNOSTI";
        
}])
//parametarCtrl
.controller("parametarCtrl", ["$scope", "$rootScope","$resource", function ($scope, $rootScope, $resource) {

    var PARAMETAR = $resource('/api/parametar');
  
    PARAMETAR.query(function (results) {
        $scope.parametari = results;
      //  debugger;
      //  $scope.Ime = results.Ime;
    }); 
     
    $scope.createParam = function () {
        $scope.loginLoading = true;

//debugger;
        var ParamRes = new PARAMETAR();

//debugger;
        ParamRes.Naziv = $scope.Naziv;
        ParamRes.Koristi = true;
        ParamRes.VredString=$scope.VredString;
        ParamRes.VredNumeric=$scope.VredNumeric;
        ParamRes.Opis = $scope.Opis;
        ParamRes.NameUser = "System";
            
       
        ParamRes.$save(function (result) {

           // debugger;
            if(result.errors){
                alert("Error Error");
                $scope.ShowError(result.errors);
            }else
            {
            debugger;
            $scope.parametari.push(result); 

            $scope.Naziv = "";
            $scope.Koristi = false;
            $scope.VredString="";
            $scope.VredNumeric="";
            $scope.Opis = "";
            $scope.NameUser = "";


           //debugger;
            }
            $scope.loginLoading = false;

        });
    } 
    
    $scope.title = "Parametri";

    $scope.ShowError = function(terror){
        debugger;
        if(terror){
            
          alert("Greska parametri !!!");
         


        }

    }
       



}])
.controller("helpCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {

        $scope.titleHelp = "HELP";
        $scope.titleContact = "CONTACT";

        $scope.InitApp = function () {



        };


        $scope.InitApp();


}])
  
})();