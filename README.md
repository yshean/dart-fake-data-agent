# Dart Fake Data Agent

Dart Fake Data Agent is an AI-powered code assistance tool, built as an extension
for Microsoft Visual Studio Code (VS Code). It uses the Google Gemini API to help you
generate fake data objects of your Dart class, which contains matching properties to
your custom Dart data class.

This project is a customisation based on the tutorial
[Build an AI Flutter code generator with Gemini](https://ai.google.dev/examples/flutter-theme-agent).
Huge thanks to Google's devrel team for making the tutorial.

## Project setup

This project is not published because it uses a private Gemini API key which subjects to usage quota.
You need to follow the steps to set up the extension in your local development environment.
The prerequisites include installing several dependencies, and obtaining the Google Gemini API key.
You can obtain the key from the [Google Gemini API](https://ai.google.dev/tutorials/setup) page.

### Install the prerequisites

The Dart Fake Data Agent project runs as an extension of Microsoft Visual Studio Code, and uses Node.js
and npm to manage packages and run the application. The following installation instructions are for a
Unix environment.

To install the required software:

1.  Install [Visual Studio Code](https://code.visualstudio.com/download) for your platform.
1.  Install `node` and `npm` by following the [installation instructions](https://nodejs.org/) for your platform.

### Clone and configure the project

Download the project code and use the `npm` installation command to download the required dependencies
and configure the project. You need [git](https://git-scm.com/) source control software to retrieve the project
source code.
To download and configure the project code:

1. Clone the git repository using the following command.\
   `git clone https://github.com/yshean/dart-fake-data-agent`
2. Navigate to the project root directory.\
   `cd dart-fake-data-agent`
3. Run the install command to download dependencies and configure the project:\
   `npm install`

### Configure and test the extension

You should now be able to test your installation by running Dart Fake Data Agent
as a development extension in VS Code on your device. The test opens a separate
VS Code **Extension Development Host** window where the new extension is
available. In this new window, you configure the API Key the extension uses to
access the Google Gemini API.

Caution: Treat your API Key like a password and protect it appropriately.
For some general best practices on key security, review this
[support article](https://support.google.com/googleapi/answer/6310037).

To configure and test your setup:

1.  Start the VS Code application.
1.  In VS Code, create a new window by selecting **File > New Window**.
1.  Open the Flutter Theme Agent project by selecting **File > Open Folder**,
    and selecting the `dart-fake-data-agent/` folder.
1.  In VS Code, open the `dart-fake-data-agent/package.json` file.
1.  Run the extension in debug mode by selecting **Run > Start Debugging**.
    This step opens a separate VS Code **Extension Development Host** window.
1.  Open the VS Code settings by selecting **Code > Settings > Settings**.
1.  Get a
    [Google Gemini API Key](https://developers.generativeai.google/tutorials/setup)
    from the Generative AI Developer site, and copy the key string.
1.  Set the API key as a configuration setting. In **Search Settings**
    field, type `dart fake data`, select the **User** tab, and in the **Google >
    Gemini: Api Key** setting, click the **Edit in settings.json** link, and
    add your Gemini API key:
      `"google.ai.apiKey": "your-api-key-here"`
1.  Save the changes to the `settings.json` file and close the settings tabs.

**Caution:** Treat your API Key like a password and protect it appropriately. Don't
embed your key in publicly published code.

To test the extension commands:

1.  In the VS Code **Extension Development Host** window, open a Flutter project.
2.  In your code, highlight the class you want to generate fake data for. For example,
`// 5 fake data objects
class Pet {
  const Pet({
    required this.id,
    required this.owner,
    required this.birthday,
    required this.location,
    required this.remarks,
  });

  final int id;
  final String owner;
  final DateTime birthday;
  final String? location;
  final String? remarks;
}`.
3.  Open the command palette by selecting **View > Command Palette**.
4.  In the Command Palette, type `Dart Fake Data Agent` and select the command.

## Resources

- Project code tutorial:
[Build an AI Flutter code generator with Gemini](https://ai.google.dev/examples/flutter-theme-agent) tutorial.

**Enjoy!**
