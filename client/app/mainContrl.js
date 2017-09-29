(function () {
    "use strict";

angular.module("ZADRUGA.controllers", [])
.controller("homeCtrl", ["$scope", "$rootScope", "appConfig","$timeout",
                     function ($scope, $rootScope, appConfig, $timeout) {
         
    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {
            console.log("Kraj home kontroler");
             window.loading_screen.finish();
        },0);
        });

        $scope.titleHome = "HOME";


}])
.controller("menuCtrl", ["$scope", "$rootScope", "appConfig","$timeout",
                     function ($scope, $rootScope, appConfig,$timeout) {
     

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
.controller("vlasnikCtrl", ["$scope", "$rootScope","$resource","$timeout", function ($scope, $rootScope, $resource,$timeout) {

   // var Vlasnik = $resource('/api/vlasnik');
  
    // Vlasnik.query(function (results) {
    //     $scope.vlasnik = results;
    //   //  debugger;
    //   //  $scope.Ime = results.Ime;
    // }); 
    var Vlasnik = $resource('/api/vlasnik', null,
    {
        'query':  {method:'GET', 
                  isArray:true,
                  transformResponse: function(results) {
                     // debugger;
                      return angular.fromJson(results).data;
                      //$scope.Mesta=results.data;
                      //return results.data;
                      }
                  }    
    }


    

  );

  Vlasnik.query(function (results) {
        $scope.vlasnik = results;
        //debugger;
  // // //   //  $scope.Ime = results.Ime;
    }); 


   // $scope.vlasnik =[]; 
  
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

            $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {
                    window.loading_screen.finish();
            },0);
            });
    



}])
.controller("posaoCtrl", ["$scope", "$rootScope","$resource","$timeout", function ($scope, $rootScope, $resource,$timeout) {

   // var Posao = $resource('/api/posao');

    var Posao = $resource('/api/posao', null,
    {
        'query':  {method:'GET', 
                  isArray:true,
                  transformResponse: function(results) {
                     // debugger;
                      return angular.fromJson(results).data;
                      //$scope.Mesta=results.data;
                      //return results.data;
                      }
                  }    
    }
  );

   // $scope.posao =[]; 
    Posao.query(function (results) {
        //if(results.success){
         $scope.posao = results;
       // }
        //debugger;
      //  $scope.Ime = results.Ime;
    }); 
   

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
            if(result.success===false){
                //alert("Error Error");
                $scope.ShowError(result.message);
            }else{
            $scope.posao.push(result.data); 

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
            // if(terror.StepenSS){
            //     alert("Greska " + terror.StepenSS.message);
            // }
            alert("Greska " + terror);


        }

    }

    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {
                window.loading_screen.finish();
        },0);
        });

       



}])
.controller("drzaveCtrl", ["$scope", "$rootScope","$resource","$timeout", function ($scope, $rootScope, $resource,$timeout) {

    var DRZAVA = $resource('/api/drzave');
  
    DRZAVA.query(function (results) {
        $scope.drzave = results;
      //  debugger;
      //  $scope.Ime = results.Ime;
    }); 
     
    $scope.createDrzavu = function () {
        $scope.loginLoading = true;
     //   debugger;
        var DrzaveRes = new DRZAVA();
        $scope.ERROR = null;

        DrzaveRes.Naziv = $scope.Naziv;
        DrzaveRes.KodDrzave = $scope.KodDrzave;
        DrzaveRes.NameUser='System';
        DrzaveRes.Opis = $scope.Opis;
            
       
        DrzaveRes.$save(function (result) {

          //  debugger;
            if(result.errors){
               // alert("Error Error");
                $scope.ERROR =result.errors;
                $scope.ShowError(result.errors);

            }else{
                if(result.KodDrzave){
                    $scope.drzave.push(result); 

                    $scope.Naziv='';
                    $scope.KodDrzave = '';
                    $scope.NameUser='';
                    $scope.Opis='';
                }
           //debugger;

            }
            $scope.loginLoading = false;

        });
    } 
    
    $scope.title = "Drzave";

    $scope.ShowError = function(terror){
        //debugger;
        if(terror){
            // if(terror.StepenSS){
            //     alert("Greska " + terror.StepenSS.message);
            // }
            if(terror.KodDrzave){
          //      alert("KOD" + terror.KodDrzave.message  + "!!!")
            }

            if(terror.Naziv){
           //     alert("NAZIV" + terror.Naziv.message  + "!!!")
            }

           // alert("Greska drzave !!!")
        }

    }
       

    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {
                console.log("Kraj drzave kontrolera");
                window.loading_screen.finish();
        },0);
        });



}])
.controller("FondSatiCtrl", ["$scope", "$rootScope","$resource","$timeout", function ($scope, $rootScope, $resource,$timeout) {
    
        $scope.FondSati = [];
        var FONDSATI = $resource('/api/fondsati', null,
           {
               'query':  {method:'GET', 
                         isArray:true,
                         transformResponse: function(results) {
                            // debugger;
                             return angular.fromJson(results).data;
                             }
                         }    
           }
         );
    
         FONDSATI.query(function (results) {
               $scope.FondSati = results;
         //      debugger;
         
           }); 
    
         $scope.title = "FOND SATI";

         $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {
                console.log("Kraj fond sati kontrolera");
                    window.loading_screen.finish();
            },0);
            });


     }])
.controller("KonstCtrl", ["$scope", "$rootScope","$resource","$timeout", function ($scope, $rootScope, $resource,$timeout) {

    $scope.Konst = [];
    var KONSTANTA = $resource('/api/konstanta', null,
       {
           'query':  {method:'GET', 
                     isArray:true,
                     transformResponse: function(results) {
                        // debugger;
                         return angular.fromJson(results).data;
                         }
                     }    
       }
     );

     KONSTANTA.query(function (results) {
           $scope.Konst = results;
          // debugger;
     
       }); 

     $scope.title = "KONSTANTA";

     $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {
                window.loading_screen.finish();
        },0);
        });


 }])
 .controller("RadnikCtrl", ["$scope", "$rootScope","$resource","$timeout", function ($scope, $rootScope, $resource,$timeout) {
    
        $scope.Radnik = [];
        var RADNIK = $resource('/api/radnik/', null,
           {
               'query':  {method:'GET', 
                         isArray:true,
                         transformResponse: function(results) {
                            // debugger;
                             return angular.fromJson(results).data;
                             }
                         }    
           }
         );
    
         RADNIK.query(function (results) {
               $scope.Radnik = results;
               //debugger;
         
           }); 
    
         $scope.title = "RADNIK";
         $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {
                    window.loading_screen.finish();
            },0);
            });

  }])
.controller("ZanimanjaCtrl", ["$scope", "$rootScope","$resource","$timeout", function ($scope, $rootScope, $resource,$timeout) {
    
        $scope.Zanimanja = [];
        var ZANIM = $resource('/api/zanimanja/', null,
           {
               'query':  {method:'GET', 
                         isArray:true,
                         transformResponse: function(results) {
                            // debugger;
                             return angular.fromJson(results).data;
                             }
                         }    
           }
         );
    
         ZANIM.query(function (results) {
               $scope.Zanimanja = results;
             //  debugger;
         
           }); 
    
         $scope.title = "ZANIMANJA";
         $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {
                    window.loading_screen.finish();
            },0);
            });

}])
 .controller("MestaCtrl", ["$scope", "$rootScope","$resource","$timeout", function ($scope, $rootScope, $resource,$timeout) {
       var MESTA = $resource('/api/mesta', null,
          {
              'query':  {method:'GET', 
                        isArray:true,
                        transformResponse: function(results) {
                           // debugger;
                            return angular.fromJson(results).data;
                            //$scope.Mesta=results.data;
                            //return results.data;
                            }
                        }    
          }
        );

          MESTA.query(function (results) {
              $scope.Mesta = results;
              //debugger;
        // // //   //  $scope.Ime = results.Ime;
          }); 

        $scope.title = "Mesta";
        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {
                console.log("Kraj mesta kontrolera");
                    window.loading_screen.finish();
            },0);
            });

    }])
    .controller("OpstineCtrl", ["$scope", "$rootScope","$resource","$timeout", function ($scope, $rootScope, $resource,$timeout) {
    
        var OPSTINE = $resource('/api/opstine', null,
           {
               'query':  {method:'GET', 
                         isArray:true,
                         transformResponse: function(results) {
                            // debugger;
                             return angular.fromJson(results).data;
                             //$scope.Mesta=results.data;
                             //return results.data;
                             }
                         }    
           }
         );
 
         OPSTINE.query(function (results) {
               $scope.Opstine = results;
               //debugger;
         // // //   //  $scope.Ime = results.Ime;
           }); 
 
         $scope.title = "OPSTINE";
         $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {
                console.log("Kraj opstine kontrolera");
                    window.loading_screen.finish();
            },0);
            });

     }])
    //parametarCtrl
.controller("parametarCtrl", ["$scope", "$rootScope","$resource","$timeout", function ($scope, $rootScope, $resource,$timeout) {

    var PARAMETAR = $resource('/api/parametar');
  
    PARAMETAR.query(function (results) {
        $scope.parametari = results;
      //  debugger;
      //  $scope.Ime = results.Ime;
    }); 
     
    $scope.createParam = function () {
   $scope.loginLoading = true;
   $scope.ERROR =null;

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
              //  alert("Error Error");
                $scope.ERROR =result.errors;
                $scope.ShowError(result.errors);
            }else
            {
          //  debugger;
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
       // debugger;
        
        // if(terror){
            
        //   alert("Greska parametri !!!");
         


        // }

    }
       
    $scope.$on('$viewContentLoaded', function(event) {
        $timeout(function() {
                window.loading_screen.finish();
        },0);
        });



}])
.controller("helpCtrl", ["$scope", "$rootScope","$timeout", function ($scope, $rootScope,$timeout) {

        $scope.titleHelp = "HELP";
        $scope.titleContact = "CONTACT";

        $scope.InitApp = function () {



        };


        $scope.InitApp();

        $scope.$on('$viewContentLoaded', function(event) {
            $timeout(function() {
                    window.loading_screen.finish();
            },0);
            });



}])
  
})();