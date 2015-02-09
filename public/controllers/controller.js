function AppCtrl ($scope, $http) {

// SETTING TIME CONFIGURATIONS
	moment.locale('fr', {
		months : [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
        "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    	]
	});

	var currentTime = "";
	$scope.currentTime = currentTime;

	$scope.setTime = function () {
		$scope.currentTime = moment().format('Do MMMM YYYY, h:mm');
	};

	$scope.mois = moment().format('MMMM YYYY');
	$scope.jour = moment().format('Do MMMM');
	$scope.heure = moment().format('HH:mm');

// CREATING INSTANCES FOR TESTING
	var janvier1 = {
		month: 'Janvier 2015',
		day: '10 Janvier',
		hour: '23h40',
		mood: 'average',
		moodValue: 5,
		texte: "Ceci est ma journée du 10 Janvier."
	};

	var janvier2 = {
		month: 'Janvier 2015',
		day: '23 Janvier',
		hour: '21h30',
		mood: 'good',
		moodValue: 8,
		texte: "Ceci est ma journée du 23 Janvier."
	};

	var janvier2015 = [janvier1];
	janvier2015.unshift(janvier2);
	
	var journal = [janvier2015];

	$scope.journal = journal;

// FONCTIONS DE CONTROLE DU JOURNAL
	$scope.compareMood = function (article, value) {
		if (article.mood == value) {
			return true;
		}
		else {
			return false;
		}
	};

	var setMood = function (article) {
		if (article.moodValue < 4) {
			article.mood = 'bad';
		}
		else if (article.moodValue < 7) {
			article.mood = 'average';
		}
		else {
			article.mood = 'good';
		}
	};

	$scope.resetForm = function () {
		$scope.inputText = "";
		$scope.inputMood = "";
		$scope.userForm.$setPristine();
	};

	$scope.submitForm = function () {
		if ($scope.userForm.$valid) {
			var article = {};
			article.month = moment().format('MMMM YYYY');
			article.day = moment().format('Do MMMM');
			article.hour = moment().format('HH:mm');
			if ($scope.inputMood == '10/10') {
				article.moodValue = 10;
			}
			else {
				article.moodValue = $scope.inputMood.substring(0,1);
			}
			setMood(article);
			article.texte = $scope.inputText;
			
			if (article.month == journal[0][0].month) {
				journal[0].unshift(article);
			}
			else {
				journal.unshift([article]);
			}
			console.log(journal);

			$scope.inputText = "";
			$scope.inputMood = "";
			$scope.userForm.$setPristine();
		}	
	};

	$scope.remove = function (tableau, $index) { 
		tableau.splice($index,1);     
	};
}