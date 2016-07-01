(function () {
  'use strict'

  angular.module('nsj.wizard')
    .directive('nsjWizard', nsjWizard)

  function nsjWizard() {

    return {
      transclude: true,
      scope: true,
      templateUrl: '/wizard/wizard.html',
      controller: WizardController,
      controllerAs: 'vm'
    }

  }

  WizardController.$inject = ['$scope',
                              'wizardService',
                              'skillsService',
                              'projectsService',
                              'mapsService',
                              '$rootScope'];

  function WizardController($scope, wizardService, skillsService, projectsService, mapsService, $rootScope) {

    var vm = this;

    vm.currentStep = wizardService.currentStep;
    vm.nextStep = nextStep;
    vm.previousStep = previousStep;
    vm.setStep = setStep;
    vm.getProgressWidth = getProgressWidth;
    vm.skills = skillsService.skills;
    vm.selectedTech = skillsService.selectedSkills;
    vm.resetSkills = resetSkills;
    vm.addSkill = addSkill;
    vm.removeSkill = removeSkill;
    vm.handleSkillToggle = handleSkillToggle;
    vm.location = '';
    vm.tech = '';
    vm.comp = '';
    vm.projects = projectsService.projects;
    vm.project = {}
    vm.showTechList = false;
    vm.toggleTechList = toggleTechList;
    vm.createHelper = createHelper;
    vm.removeHelper = removeHelper;
    vm.saveEdits = saveEdits;
    vm.isEditing = false;
    vm.cancelEdit = cancelEdit;
    vm.setEditingProjectIndex = setEditingProjectIndex;
    vm.currentEditProject = projectsService.currentEditProject;
    vm.editingProject = {}
    vm.editingProject.name = ''
    vm.editingProject.client = ''
    vm.editingProject.desc = ''
    vm.editingProject.url = ''
    vm.fulltimeSelected = true;
    vm.contractSelected= false;
    vm.selectFulltime = selectFulltime;
    vm.selectContract = selectContract;
    vm.radius = '';

    function setStep(newStep) {
      wizardService.setStep(newStep).then(function(step) {
        vm.currentStep = step;
        vm.progressWidth = ((step / 3) * 100) + '%';
      })
    }

    function nextStep() {
      wizardService.nextStep().then(function(step) {
        vm.currentStep = step;
      })
    }

    function previousStep() {
      wizardService.previousStep().then(function(step) {
        vm.currentStep = step;
        vm.progressWidth = ((step / 3) * 100) + '%';
      })
    }

    function handleSkillToggle(skill) {
      if(vm.selectedTech.indexOf(skill) > -1) {
        vm.removeSkill(skill)
      }
      else {
        vm.addSkill(skill)
      }
      vm.tech = skillsService.selectedSkills[0]+', '+skillsService.selectedSkills[1]+' ...';
    }

    function addSkill(skill) {
      skillsService.addSkill(skill).then(function(skills) {
        vm.selectedTech = skills;
      })
    }

    function removeSkill(skill) {
      skillsService.removeSkill(skill)
      vm.selectedTech = skillsService.getSelectedSkills();
    }

    function getProgressWidth() {
       return ((vm.currentStep / 3) * 100) + '%';
    }

    function resetSkills() {
      skillsService.resetSkills().then(function(skills) {
        vm.selectedTech = skills;
      })
    }

    function resetProject() {
      resetSkills();
      vm.tech = '';
      vm.showTechList = false;
      vm.newProject.name = null;
      vm.newProject.client = null;
      vm.newProject.url = null;
      vm.newProject.desc = null;
    }

    function toggleTechList() {
      vm.showTechList = !vm.showTechList;
    }

    function cancelEdit() {
      vm.isEditing = false;
      resetProject();
    }

    function createHelper(project) {
      projectsService.createHelper(project);
      vm.projects = projectsService.getProjects();
      resetProject();
    }

    function removeHelper(index) {
      projectsService.removeHelper(index);
      vm.projects = projectsService.getProjects();
    }

    function saveEdits() {
      vm.editingProject.techUsed = vm.selectedTech;
      projectsService.saveEdits(vm.editingProject)
      resetProject()
      vm.isEditing = false;
      vm.editingProject.name = ''
      vm.editingProject.client = ''
      vm.editingProject.desc = ''
      vm.editingProject.url = ''
    }

    function setEditingProjectIndex(index) {

      var currentlyEditing = projectsService.projects[index];
      projectsService.setEditingProjectIndex(index);
      vm.editingProject.name = currentlyEditing.name
      vm.editingProject.client = currentlyEditing.client
      vm.editingProject.desc = currentlyEditing.desc
      vm.editingProject.url = currentlyEditing.url
      skillsService.setSelectedSkills(currentlyEditing.techUsed)
      vm.selectedTech = skillsService.getSelectedSkills()
      vm.isEditing = true;
    }

    function selectFulltime() {
      vm.fulltimeSelected = true;
      vm.contractSelected= false;
    }

    function selectContract() {
      vm.fulltimeSelected = false;
      vm.contractSelected= true;
    }

    $rootScope.$on('nsj:location', function($scope, placeObj) {
      vm.location = placeObj.formatted_address;
    })

  }


})()