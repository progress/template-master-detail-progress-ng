# NativeScript with Angular Master Detail Template

Master Detail template to access a Progress Data Object backend.

App templates help you jump start your native cross-platform apps with built-in UI elements and best practices. Save time writing boilerplate code over and over again when you create new apps.

This Master-Detail template is a fundamental building block for any app that displays collection of objects and their details.

The Master Detail template provides support for CRUD operations, server-filtering and server-side sorting using an OpenEdge backend.
The following authentication modes can be used:
* Anonymous 
* Basic authentication
* Form-based authentication


## Quick Start
Execute the following command to create an app from this template:

```
tns create my-app-name --template tns-template-master-detail-progress-ng
```

> Note: This command will create a new NativeScript app that uses the latest version of this template published to [npm] (https://www.npmjs.com/package/tns-template-master-detail-progress-ng).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
tns create my-app-name --template https://github.com/progress/template-master-detail-progress-ng
```

## Walkthrough

### Architecture
The template has the following components:
- `/customers/customer-list/customer-list.component.ts` - the master list component. It gets the data and displays it in a list. On item tap, it navigates to the item details component. Use swipe action to delete items.
- `/customers/customer-detail/customer-detail.component.ts` - the item details component. Displays the details of the tapped item. Has an `Edit` button that leads to the edit component.
- `/customers/customer-detail-edit/customer-detail-edit.component.ts` - the item details edit component. Provides edit options for the selected item. The `Done` button saves the changes. This component also provides support for the create and delete operations in addition to the update operation.

There is one model to represent the data items:
- `/customers/shared/customer.model.ts`

The template also provides a data service:
- `/customers/shared/customer.service.ts` - serves as a data layer for the master-detail data items. Wraps the functions that are used to make operations on the OpenEdge database.

There is 2nd model to represent state items to be used in a ListPicker when editing a customer row:
- `/customers/shared/state.model.ts`

The template also provides a state data service to retreive state items from an OpenEdge database:
- `/customers/shared/state.service.ts`

### Styling
This template is set up to use SASS for styling. All classes used are based on the {N} core theme . consult the [documentation](https://docs.nativescript.org/angular/ui/theme.html#theme) to understand how to customize it. Check it out to see what classes you can use on which component.

It has 4 global style files that are located at the root of the app folder:
- `_app-variables.scss` - holds the global SASS variables that are imported on each component's styles.
- `app.scss` - the global common style sheet. These style rules are applied to both Android and iOS.
- `platform.android.scss` - the global Android style sheet. These style rules are applied to Android only.
- `platform.ios.scss` - the global iOS style sheet. These style rules are applied to iOS only.

Each component has 3 style files located in its folder:
- `_page-name.scss` - the component common style sheet. These style rules are applied to both Android and iOS.
- `page-name.android.scss` - the component Android style sheet. These style rules are applied to Android only.
- `page-name.ios.scss` - the component iOS style sheet. These style rules are applied to iOS only.

## Get Help
The NativeScript framework has a vibrant community that can help when you run into problems.

Try [joining the NativeScript community Slack](http://developer.telerik.com/wp-login.php?action=slack-invitation). The Slack channel is a great place to get help troubleshooting problems, as well as connect with other NativeScript developers.

If you have found an issue with this template, please report the problem in the   [Issues](https://github.com/CloudDataObject/template-master-detail-progress-ng/issues).

## Contributing

We love PRs, and accept them gladly. Feel free to propose changes and new ideas. We will review and discuss, so that they can be accepted and better integrated.
