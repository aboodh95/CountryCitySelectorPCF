import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CountryCity, ICountryCityProps } from "./components/CountryCity";
import { initializeIcons } from "office-ui-fabric-react";

export class CountryCitySelector
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  City: string;
  Country: string;
  container: HTMLDivElement;
  notifyOutputChanged: () => void;
  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    this.notifyOutputChanged = notifyOutputChanged;
    this.container = container;
    initializeIcons();
    var props = {
      updateCountryAndCity: this.updateCountryAndCity.bind(this),
      selectedCity: context.parameters.City?.raw,
      selectedCountry: context.parameters.Country?.raw,
      CityLabel: context.parameters.City?.attributes?.DisplayName,
      CountryLabel: context.parameters.Country?.attributes?.DisplayName,
    } as ICountryCityProps;

    ReactDOM.render(React.createElement(CountryCity, props), container);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    console.log(context.parameters.Country?.raw);
    var props = {
      updateCountryAndCity: this.updateCountryAndCity.bind(this),
      selectedCity: context.parameters.City?.raw,
      selectedCountry: context.parameters.Country?.raw,
      CityLabel: context.parameters.City?.attributes?.DisplayName,
      CountryLabel: context.parameters.Country?.attributes?.DisplayName,
    } as ICountryCityProps;

    ReactDOM.render(React.createElement(CountryCity, props), this.container);
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      City: this.City,
      Country: this.Country,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }

  public updateCountryAndCity(country: string, city: string) {
    this.Country = country;
    this.City = city;
    this.notifyOutputChanged();
  }
}
