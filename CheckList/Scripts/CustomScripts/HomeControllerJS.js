var app = angular.module('app', ['ngSanitize', 'MassAutoComplete']);
app.controller('mainCtrl', function ($scope, $sce, $q, $http) {
    $scope.dirty = {};
    $scope.type = '';
    $scope.name = '';
    $scope.isTypeValid = false;
    $scope.isNameValid = false;


    $scope.checkUniqueName = function () {

        $http.get("/Home/CheckUniqueName/", {
            params: { name: $scope.name }
        }).success(function (data) {

            if (data === 'False') {
                $scope.isNameValid = true;
            } else {
                $scope.isNameValid = false;
            }

        });
    }
    $scope.postForm = function () {
        var data = {
            Name: $scope.name,
            Type: $scope.dirty.value,
        };
        $http({
            method: "POST",
            url: "/Home/AddNameType/",
            data: JSON.stringify(data)
        }).success(function (data) {
            alert("Succesfully added name and type");
            $scope.isTypeValid = false;
            $scope.isNameValid = false;
        }
        );

    }
    function suggest_state(term) {
        var q = term.toLowerCase().trim();
        var deferred = $q.defer();
        var results = [];

        if (q.length > 3) {
            $http.get("/Home/GetTypeList/", {
                params: { name: q }
            }).success(function (data) {

                angular.forEach(data, function (item) {
                    results.push({ label: item, value: item });
                });
                if (results.length == 0) {
                    results.push({ label: 'Nothing is found', value: 'Nothing is found' });
                    $scope.isTypeValid = true;
                } else {
                    $scope.isTypeValid = false;
                }
                deferred.resolve(results);

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
            });

        }
        else {
            $scope.isTypeValid = false;
            results = [];
            deferred.resolve(results);
        }

        return deferred.promise
    }


    $scope.autocomplete_options = {
        suggest: suggest_state
    };



});