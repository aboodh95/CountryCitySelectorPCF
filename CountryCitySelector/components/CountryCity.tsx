import * as React from "react";
import { Cities } from "../assets/cities";
import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  Stack,
  SelectableOptionMenuItemType,
  IStackTokens,
  Fabric,
  Label,
  IStackStyles,
  ILabelStyles,
} from "office-ui-fabric-react";

export interface ICountryCityProps {
  updateCountryAndCity: (country: string, city: string) => void;
  selectedCountry: string;
  selectedCity: string;
  CountryLabel: string;
  CityLabel: string;
  isControlDisabled: boolean;
}

export interface ICountryCityState {
  cities: IComboBoxOption[];
  selectedCountry: string;
  selectedCity: string;
}

export class CountryCity extends React.Component<
  ICountryCityProps,
  ICountryCityState
> {
  constructor(props: ICountryCityProps) {
    super(props);
    let cities: IComboBoxOption[] = [
      {
        key: "Header",
        text: "City",
        itemType: SelectableOptionMenuItemType.Header,
      },
    ];
    if (
      this.props.selectedCountry.length != 0 &&
      Object.keys(Cities).find(
        (country) => country.toString() == this.props.selectedCountry
      )
    ) {
      for (
        let index = 0;
        index < Cities[this.props.selectedCountry as any].length;
        index++
      ) {
        const element = Cities[this.props.selectedCountry as any][index];
        cities.push({
          key: element,
          text: element,
        });
      }
    }
    this.state = {
      cities: cities,
      selectedCountry: this.props.selectedCountry,
      selectedCity: this.props.selectedCity,
    };
  }

  render() {
    let comboBoxBasicOptions: IComboBoxOption[] = [
      {
        key: "Header",
        text: "Country",
        itemType: SelectableOptionMenuItemType.Header,
      },
    ];
    Object.keys(Cities).map((key) => {
      comboBoxBasicOptions.push({
        key: key,
        text: key,
      });
    });

    const stackTokens: IStackTokens = {
      childrenGap: 5,
    };
    const stackStyles: IStackStyles = {
      root: {
        width: 145,
      },
    };
    const labelStyles: ILabelStyles = {
      root: {
        textAlign: "left",
        fontWeight: "normal",
      },
    };
    return (
      <Fabric>
        <Stack tokens={stackTokens}>
          <Stack.Item>
            <Stack horizontal tokens={stackTokens}>
              <Stack.Item styles={stackStyles}>
                <Label styles={labelStyles}>{this.props.CountryLabel}</Label>
              </Stack.Item>
              <Stack.Item grow>
                <ComboBox
                  disabled={this.props.isControlDisabled}
                  defaultSelectedKey={this.props.selectedCountry}
                  placeholder="Country"
                  allowFreeform
                  autoComplete="on"
                  options={comboBoxBasicOptions}
                  selectedKey={this.props.selectedCountry}
                  onChange={(event, option) => {
                    var country = option?.key
                      ? option?.key
                      : "Uniter Arab Emirates";
                    debugger;
                    let cities: IComboBoxOption[] = [
                      {
                        key: "Header",
                        text: "City",
                        itemType: SelectableOptionMenuItemType.Header,
                      },
                    ];
                    for (
                      let index = 0;
                      index < Cities[country as any].length;
                      index++
                    ) {
                      const element = Cities[country as any][index];
                      cities.push({
                        key: element,
                        text: element,
                      });
                    }
                    this.setState({
                      cities: cities,
                      selectedCountry: country.toString(),
                    });
                    this.props.updateCountryAndCity(country.toString(), "");
                  }}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <Stack horizontal tokens={stackTokens}>
              <Stack.Item styles={stackStyles}>
                <Label styles={labelStyles}>{this.props.CityLabel}</Label>
              </Stack.Item>
              <Stack.Item grow>
                <ComboBox
                  disabled={this.props.isControlDisabled}
                  allowFreeform
                  defaultSelectedKey={this.props.selectedCity}
                  autoComplete="on"
                  placeholder="City"
                  selectedKey={this.props.selectedCity}
                  options={this.state.cities}
                  onChange={(event, option) => {
                    var city = option?.key ? option?.key : "Sharjah";
                    debugger;
                    this.setState({
                      selectedCity: city.toString(),
                    });
                    this.props.updateCountryAndCity(
                      this.state.selectedCountry,
                      city.toString()
                    );
                  }}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </Fabric>
    );
  }
}
