
const Lang = imports.lang;
const Shell = imports.gi.Shell;

const Main = imports.ui.main;
const RunDialog = imports.ui.runDialog;

const SearchingRunDialog = new Lang.Class({
    Name: 'SearchingRunDialog',
    Extends: RunDialog.RunDialog,

    _getCompletion: function(text) {
        let appSystem = Shell.AppSystem.get_default();

        let app = appSystem.initial_search([text])[0];
        if (app)
            return app.get_id().slice(text.length);
        return null;
    },

    _run: function(input) {
        let appSystem = Shell.AppSystem.get_default();

        let appId = input;
        let app = appSystem.lookup_app(appId);

        if (this._internalCommands[input])
            this._internalCommands[input]();

        if (!app)
            app = appSystem.initial_search([input])[0];

        if (app)
            app.open_new_window(-1);
    }
});

function init() {}

let oldGetRunDialog;

function newGetRunDialog() {
    if (Main.runDialog == null)
        Main.runDialog = new SearchingRunDialog();
    return Main.runDialog;
}

function enable() {
    Main.runDialog = null;
    [oldGetRunDialog, Main.getRunDialog] = [Main.getRunDialog, newGetRunDialog];
}

function disable() {
    [oldGetRunDialog, Main.getRunDialog] = [null, oldGetRunDialog];
}
