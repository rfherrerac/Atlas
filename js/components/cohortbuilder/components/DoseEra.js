define(['knockout', '../options', '../utils', '../InputTypes/Range', '../CriteriaGroup', 'text!./DoseEraTemplate.html'], function (ko, options, utils, Range, CriteriaGroup, template) {

	function DoseEraViewModel(params) {

		var self = this;
		self.expression = ko.utils.unwrapObservable(params.expression);
		self.Criteria = params.criteria.DoseEra;
		self.options = options;
		self.formatOption = function (d) {
			return '<div class="optionText">' + d.text + '</div>' +
				'<div class="optionDescription">' + d.description + '</div>';
		};
		self.addActions = [{
				text: "Add First Exposure Criteria",
				selected: false,
				description: "Limit Dose Era to new exposure.",
				action: function () {
					if (self.Criteria.First() == null)
						self.Criteria.First(true);
				}
			},
			{
				text: "Add Age at Era Start Criteria",
				selected: false,
				description: "Filter Drug Eras by age at era start.",
				action: function () {
					if (self.Criteria.AgeAtStart() == null)
						self.Criteria.AgeAtStart(new Range());
				}
			},
			{
				text: "Add Age at Era End Criteria",
				selected: false,
				description: "Filter Drug Eras by age at era end.",
				action: function () {
					if (self.Criteria.AgeAtEnd() == null)
						self.Criteria.AgeAtEnd(new Range());
				}
			},
			{
				text: "Add Gender Criteria",
				selected: false,
				description: "Filter Drug Eras based on Gender.",
				action: function () {
					if (self.Criteria.Gender() == null)
						self.Criteria.Gender(ko.observableArray());
				}
			},
			{
				text: "Add Era Start Date Criteria",
				selected: false,
				description: "Filter Dose Eras by the Era Start Date.",
				action: function () {
					if (self.Criteria.EraStartDate() == null)
						self.Criteria.EraStartDate(new Range({
							Op: "lt"
						}));
				}
			},
			{
				text: "Add Era End Date Criteria",
				selected: false,
				description: "Filter Dose Eras by the Era End Date.",
				action: function () {
					if (self.Criteria.EraEndDate() == null)
						self.Criteria.EraEndDate(new Range({
							Op: "lt"
						}));
				}
			},
			{
				text: "Add Dose Unit Criteria",
				selected: false,
				description: "Filter Dose Eras by the Unit.",
				action: function () {
					if (self.Criteria.Unit() == null)
						self.Criteria.Unit(ko.observableArray());
				}
			},
			{
				text: "Add Era Length Criteria",
				selected: false,
				description: "Filter Drug Eras by the Era duration.",
				action: function () {
					if (self.Criteria.EraLength() == null)
						self.Criteria.EraLength(new Range());
				}
			},
			{
				text: "Add Dose Value Criteria",
				selected: false,
				description: "Filter Dose Eras by the dose value.",
				action: function () {
					if (self.Criteria.DoseValue() == null)
						self.Criteria.DoseValue(new Range());
				}
			},
			{
				text: "Add Nested Criteria...",
				selected: false,
				description: "Apply criteria using the dose era as the index event.",
				action: function () {
					if (self.Criteria.CorrelatedCriteria() == null)
						self.Criteria.CorrelatedCriteria(new CriteriaGroup(null, self.expression.ConceptSets));
				}
			}
		];

		self.removeCriterion = function (propertyName) {
			self.Criteria[propertyName](null);
		}
		
		self.indexMessage = ko.pureComputed(() => {
			var conceptSetName = utils.getConceptSetName(self.Criteria.CodesetId, self.expression.ConceptSets, 'Any Dose Era');
			return `The index date refers to the dose era of ${conceptSetName}.`;
		});
	}

	// return compoonent definition
	return {
		viewModel: DoseEraViewModel,
		template: template
	};
});
