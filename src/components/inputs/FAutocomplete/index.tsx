import React, { Component, } from 'react'
import { Dimensions, Platform, View, StyleSheet, Modal } from 'react-native'
import FInput from '../FInput';
import { Button, } from 'react-native-elements'
import { FlatList, } from 'react-native-gesture-handler';
import FViewLoading from '~/components/views/FViewLoading';
import COLORS from '~/config/colors/colors';

/**
 *  onChooseValue : func từ con trả về cho component cha giá trị - required
 *  placeholder (thanh Finput) : placeholder của Finput - required
 *  title (thanh Finput,thanh Finput tìm kiếm) : tiêu đề và placeholder
 *  value (thanh Finput) : giá trị từ props ,default là placeholder - required
 *  items : danh sách tìm kiếm  - required
 *  isShow : đóng mở model - required
 */


interface IProps {
    showSearch?: boolean;
    editable?: boolean;
    keyboardType?: string;
    onChangeText?: (value: string) => void;
}

export default class FAutoComplete extends Component<IProps> {
    state = {
        isShow: false,
        isLoading: false,
        autoCompletes: [],
    };

    renderItem = (info: any) => {
        const {
            onChooseValue,
            items,
        } = this.props;

        return (
            <View
                style={{
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    marginVertical: 3,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    elevation: Platform.OS === 'android' ? 2 : undefined,
                }}
            >
                <Button
                    type="clear"
                    onPress={() => {
                        onChooseValue(info.item.value);
                        this.setState({
                            isShow: false,
                            autoCompletes: items,
                        });
                    }}
                    title={info.item.label}
                    titleStyle={{ color: 'black' }}
                    buttonStyle={{ justifyContent: 'flex-start' }}
                />
            </View>
        )
    }

    renderKey = (item: any, index: number) => {
        return `${index}`;
    }

    searchAutoCpl = (keySearch: string) => {
        const { items, placeholder } = this.props;
        const { autoCompletes } = this.state;

        if (keySearch) {
            const searchedAutoCpl = autoCompletes.filter((autoCpl) => {
                return autoCpl.label.toLowerCase().indexOf(keySearch.toLowerCase()) > -1;
            });
            this.setState({ autoCompletes: searchedAutoCpl, isLoading: false });
        } else {
            this.setState({
                autoCompletes: [...placeholder, ...items],
                isLoading: false
            });
        }
    };

    findLabel = () => {
        const { value, items, } = this.props;
        const find = items.find(data => data.id === value);

        if (value && find) {
            return find.label;
        }
        return null;
    }

    render() {
        const height = Dimensions.get("screen").height;
        const {
            title,
            items,
            placeholder,
            disabled,
            label,
            labelStyle,
            errorMessage,
            errorStyle,
            hidenLabel,
            // onLoadMore,
            showSearch = true,
            editable = false,
            keyboardType,
            onChangeText
        } = this.props;

        const newPropsLabels = {
            labelStyle,
            errorMessage,
            errorStyle,
        };
        if (!hidenLabel) {
            newPropsLabels.label = label;
        }

        const { isShow, isLoading, autoCompletes, } = this.state;

        let searchWaiting = null;

        return (
            <View>
                <FInput
                    type='square'

                    editable={editable}
                    placeholder={label}
                    value={this.findLabel()}
                    rightIcon={{
                        type: "material",
                        name: "arrow-drop-down",
                        color: disabled ? 'silver' : 'black',
                        onPress: () => {
                            if (disabled) return;
                            this.setState({
                                isShow: !isShow,
                                autoCompletes: [...placeholder, ...items],
                            })
                        }
                    }}
                    inputContainerStyle={{ height: 35, }}
                    inputStyle={{ color: 'black', fontSize: 13, }}
                    {...newPropsLabels}
                    labelStyle={{ fontWeight: 'bold' }}
                    keyboardType={keyboardType as any}
                    onChangeText={(value: string) => onChangeText(value)}
                />

                <Modal
                    visible={isShow}
                    transparent={true}
                >
                    <View style={{
                        borderColor: 'transparent',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        flex: 1
                    }}>
                        <View
                            style={{
                                backgroundColor: 'whitesmoke',
                                flex: 1,
                                bottom: 0,
                                position: 'absolute',
                                width: '100%',
                            }}
                        >
                            <View style={{ marginTop: showSearch ? 0 : 5 }}>
                                {showSearch &&
                                    <View style={{ backgroundColor: COLORS.primary, }}>
                                        <FInput
                                            type='square'

                                            placeholder={"Tìm kiếm " + title}
                                            leftIcon={{
                                                type: "material",
                                                name: "search",
                                                color: 'white'
                                            }}
                                            placeholderTextColor="white"

                                            onChangeText={(value) => {
                                                if (searchWaiting) {
                                                    clearTimeout(searchWaiting);
                                                }
                                                this.setState({ isLoading: true });
                                                searchWaiting = setTimeout(() => {
                                                    searchWaiting = null;
                                                    this.searchAutoCpl(value);
                                                }, 5);
                                            }}

                                            inputContainerStyle={{ height: 35, borderColor: 'white' }}
                                            inputStyle={{ fontSize: 13, color: 'white' }}
                                            containerStyle={{ marginTop: 5, height: 40 }}
                                        />
                                    </View>
                                }

                                <View style={{ height: height / 3.5, flex: 1 }}>

                                    <FViewLoading                                    >
                                        <FlatList
                                            data={autoCompletes}
                                            renderItem={this.renderItem}
                                            keyExtractor={this.renderKey}

                                            onEndReachedThreshold={0.5}
                                        />
                                    </FViewLoading>
                                </View>
                                <Button
                                    type="outline"
                                    title={"Thoát"}
                                    onPress={() => {
                                        this.setState({ isShow: !isShow })
                                    }}
                                    titleStyle={{ color: 'white', fontSize: 13 }}
                                    buttonStyle={{ borderWidth: 1, borderColor: 'red', backgroundColor: 'red' }}
                                    containerStyle={{ marginTop: 5, marginLeft: 10, marginRight: 10 }}
                                />
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lblText: { marginLeft: 5, marginTop: 5, fontSize: 16, color: 'white' },
    rowContainer: {
        flexDirection: "row", justifyContent: "space-between", marginTop: 10
    },
})
