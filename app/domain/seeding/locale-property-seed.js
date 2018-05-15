const {LocaleProperty} = require("../LocaleProperty");

module.exports = [
	//region Czech

	// Submenu
	new LocaleProperty({ locale: "cs-CZ", locKey: "project.submenu.title", value: "PROJEKTY" }),

	// Projekt
	new LocaleProperty({ locale: "cs-CZ", locKey: "project.new.title", value: "Nový projekt" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "project.detail.title", value: "Projekt" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "project.create", value: "Vytvořit nový projekt" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "project.project.name", value: "Název" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "project.project.description", value: "Popis" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "project.list.name", value: "Název" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "project.list.description", value: "Popis" }),

	// Backlog
	new LocaleProperty({ locale: "cs-CZ", locKey: "backlog.new.title", value: "Nová položka backlogu" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "backlog.detail.title", value: "Položka backlogu" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "backlog.create", value: "Vytvořit novou položku" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "backlog.backlog.name", value: "Název" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "backlog.backlog.description", value: "Popis" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "backlog.list.name", value: "Název" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "backlog.list.description", value: "Popis" }),

	// Common
	new LocaleProperty({ locale: "cs-CZ", locKey: "common.save.btn", value: "Uložit" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "common.delete.btn", value: "Smazat" }),
	new LocaleProperty({ locale: "cs-CZ", locKey: "common.delete.confirmation", value: "Opravdu chcete položku smazat?" }),

	//endregion
];