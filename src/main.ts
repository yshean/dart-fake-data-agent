import * as vscode from 'vscode';

import { GoogleGenerativeAI} from '@google/generative-ai';

// Provide instructions for the AI language model
// This approach uses a few-shot technique, providing a few examples.
export const PROMPT_PRIMING = `
You are an expert Flutter developer, your Flutter code is thorough,
easily human readable and and up to date with the latest stable
version of Flutter. You only provide the constructor object without
any additional information or comment and remove markdown formatting.
The code can be inserted inline into existing code and works.
`;

const FAKEDATA_CONTEXT=`
Your job is to generate a fake data object based on the class in the given prompt.
The fake data object should be a Dart object that matches the class properties in the prompt.
The values of each property should be realistic and semantically correct.

Here's an example user prompt:
class Student {
  const Student({
    required this.id,
    required this.name,
    required this.contactNumber,
    required this.birthday,
    required this.studentSince,
    required this.parentName,
    required this.parentContactNumber,
    required this.remarks,
    required this.numberOfClassesPerMonth,
    required this.defaultClassTime,
    required this.defaultDayOfWeek,
    required this.defaultLocation,
  });

  final int id;
  final String name;
  final String? contactNumber;
  final DateTime? birthday;
  final DateTime? studentSince;
  final String? parentName;
  final String? parentContactNumber;
  final String? remarks;
  final int? numberOfClassesPerMonth;
  final TimeOfDay? defaultClassTime;
  final int? defaultDayOfWeek;
  final String? defaultLocation;
}

Here's the example of good Dart code:
final exampleStudent = Student(
  id: 1,
  name: 'John Doe',
  contactNumber: '1234567890',
  birthday: DateTime(2000, 1, 1),
  studentSince: DateTime(2020, 1, 1),
  parentName: 'Jane Doe',
  parentContactNumber: '0987654321',
  remarks: 'Does not have a piano at home.',
  numberOfClassesPerMonth: 4,
  defaultClassTime: TimeOfDay(hour: 10, minute: 0),
  defaultDayOfWeek: 1,
  defaultLocation: 'New York City',
);
This example code is a good because it utilizes all of the properties in the original prompt,
and the values make sense realistically.

Here is another example of a user prompt:
class Car {
  const Car({
    required this.make,
    required this.model,
    required this.year,
    required this.color,
    required this.price,
    required this.mileage,
    required this.engineSize,
  });

  final String make;
  final String model;
  final int year;
  final String color;
  final double price;
  final int mileage;
  final double engineSize;
}

Here's the example of good Dart code:
final exampleCar = Car(
  make: 'Toyota',
  model: 'Corolla',
  year: 2022,
  color: 'Red',
  price: 20000.0,
  mileage: 10000,
  engineSize: 2.0,
);
This example code is good because it utilizes all of the properties in the original prompt,
and the values make sense realistically.

You can also generate multiple fake data objects based on the same class.
Make sure that each object is unique and realistic.
User's prompt should look like this:
// 3 fake data objects
class Person {
  const Person({
    required this.name,
    required this.age,
    required this.dob,
  });

  final String name;
  final int age;
  final DateTime dob;
}

Here's the example of good Dart code:
final examplePersons = [
  Person(
    name: 'John Doe',
    age: 25,
    dob: DateTime(1997, 1, 1),
  ),
  Person(
    name: 'Jane Doe',
    age: 30,
    dob: DateTime(1992, 1, 1),
  ),
  Person(
    name: 'Alice Smith',
    age: 35,
    dob: DateTime(1987, 1, 1),
  ),
];
This example code is good because it generates multiple fake data objects based on the same class,
and it follows the prompt's requirements that it generates exactly 3 fake data objects in a list.
`;

export async function generateFakeData(){
  vscode.window.showInformationMessage('Generating Fake Data...');

  // Get API Key from local user configuration
  const apiKey = vscode.workspace.getConfiguration().get<string>('google.ai.apiKey');
  if (!apiKey) {
      vscode.window.showErrorMessage('API key not configured. Check your settings.');
      return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const gemini = genAI.getGenerativeModel({model: "gemini-pro"});

  // Text selection
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
      console.debug('Abandon: no open text editor.');
      return;
  }

  const selection = editor.selection;
  const selectedPrompt = editor.document.getText(selection);

  // Build the full prompt using the template.
  const fullPrompt = `${PROMPT_PRIMING + FAKEDATA_CONTEXT + selectedPrompt}`;

  const result = await gemini.generateContent(fullPrompt);
  const response = result.response;

  if (!response) {
      console.error('No candidates', response);
      vscode.window.showErrorMessage('No comment candidates returned. Check debug logs.');
      return;
  }
  const comment = response.text();

  // Insert in place of selection.
  editor.edit((editBuilder) => {
      // Insert code inline where the highlighted text is.
      editBuilder.insert(selection.start, comment);
  });
}