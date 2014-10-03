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

tttApp.directive("grid", function(){
    return function(scope, element){
        element.bind("DOMSubtreeModified",function(){
            if (element.html() == "X") element.css("color", "#dd9bb1");
            if (element.html() == "O") element.css("color", "#8bcd85");
        });
    }
});

tttApp.controller('tttController', ['$scope','$firebase',
    function($scope, $firebase){
        var ref = new Firebase("https://amber-torch-1305.firebaseio.com/ttt");
        var sync = $firebase(ref);
        var keys = ["tl","tc","tr",
                    "ml","mc","mr",
                    "bl","bc","br"];
        $scope.ttt = sync.$asObject();

        function check(mark) {
            flag = false;
            for (i=0; i<3; i++) {
                // check horizontal lines
                checker = true;
                for (j=i*3; j<i*3+3; j++) checker = checker && ($scope.ttt[keys[j]] == mark);
                if (checker) flag = true;
                // check vertical lines
                checker = true;
                for (j=i; j<9; j+=3) checker = checker && ($scope.ttt[keys[j]] == mark);
                if (checker) flag = true;
            }
            // check diagonal lines
            if ($scope.ttt[keys[4]] == mark) {
                if ($scope.ttt[keys[0]] == mark && $scope.ttt[keys[8]] == mark) flag = true;
                if ($scope.ttt[keys[2]] == mark && $scope.ttt[keys[6]] == mark) flag = true;
            }
            return flag;
        }

        setInterval(function(){
            if (check("X") && $scope.ttt.start) {
                alert("X wins!");
                sync.$set("start",false);
            }
            if (check("O") && $scope.ttt.start) {
                alert("O wins!");
                sync.$set("start",false);
            }
        }, 100);

        function clicked(pos) {
            if ($scope.ttt[pos] === "" && $scope.ttt.start) {
                sync.$set(pos,$scope.ttt.cur);
                var setCur = $scope.ttt.cur == "X"? "O":"X";
                sync.$set("cur",setCur);
            }
        }

        function reset() {
            for (i=0; i<keys.length; i++) {
                sync.$set(keys[i],"");
            }
            sync.$set("start",true);
        }

        $scope.clicked = clicked;
        $scope.reset = reset;

}]);
