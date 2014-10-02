//
// By Hosuke Huang Geyang
// 2 Oct 2014
//
//
// CS 105: MP3
// Use this file to program the code associated with the tictactoe.html file.
// - Read the PDF file on the CS 105 website to know how to get started!
// - The PDF will walk you through most of the MP, make sure to read the
//   _FULL_ file and not simply skip to the end.
//

var tttApp = angular.module("tttApp",["firebase"]);

tttApp.controller('tttController', ['$scope','$firebase',
    function($scope, $firebase){
        var ref = new Firebase("https://amber-torch-1305.firebaseio.com/ttt");
        var sync = $firebase(ref);
        $scope.ttt = sync.$asObject();

        function clicked(pos) {
            if ($scope.ttt[pos] === "") {
                sync.$set(pos,$scope.ttt.cur);
                var setCur = $scope.ttt.cur == "X"? "O":"X";
                console.log(setCur);
                sync.$set("cur",setCur);
            }
        }

        function reset() {
            var keys = ["tl","tc","tr",
                       "ml","mc","mr",
                       "bl","bc","br"];
            for (i=0; i<keys.length; i++) {
                sync.$set(keys[i],"");
            }
        }

        $scope.clicked = clicked;
        $scope.reset = reset;

}]);
