import React, { Component, Fragment } from 'react';
import {
  TouchableOpacity,
  Text,
  Linking,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './ScanStyle';
import { AppImages } from '../../../res/index';
class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: false,
      ScanResult: false,
      result: null,
    };
  }
  onSuccess = (e) => {
    const check = e.data.substring(0, 4);
    console.log('scanned data' + check);
    this.setState({
      result: e,
      scan: false,
      ScanResult: true,
    });
    if (check === 'http') {
      Linking.openURL(e.data).catch((err) =>
        console.error('An error occured', err),
      );
    } else {
      this.setState({
        result: e,
        scan: false,
        ScanResult: true,
      });
    }
  };
  activeQR = () => {
    this.setState({ scan: true });
  };
  scanAgain = () => {
    this.setState({ scan: true, ScanResult: false });
  };
  render() {
    const { scan, ScanResult, result } = this.state;
    return (
      <View style={styles.scrollViewStyle}>
        <Fragment>
          {!scan && !ScanResult && (
            <View style={styles.cardView}>
              <Text numberOfLines={8} style={styles.descText}>
                Please move your camera {'\n'} over the QR Code
              </Text>
              <Image
                source={AppImages.qr_code}
                style={{ margin: 20, height: 250, width: 250 }}
              ></Image>
              <TouchableOpacity
                onPress={this.activeQR}
                style={styles.buttonScan}
              >
                <View style={styles.buttonWrapper}>
                  <Image
                    source={AppImages.qr_camera}
                    style={{ height: 36, width: 36 }}
                  ></Image>
                  <Text style={{ ...styles.buttonTextStyle, color: '#2196f3' }}>
                    Scan QR Code
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {ScanResult && (
            <Fragment>
              <Text style={styles.textTitle1}>Successfully Scanned!</Text>
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type : {result.type}</Text>
                <Text>Result : {result.data}</Text>
                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                <TouchableOpacity
                  onPress={this.scanAgain}
                  style={styles.buttonScan}
                >
                  <View style={styles.buttonWrapper}>
                    <Image
                      source={AppImages.qr_camera}
                      style={{ height: 36, width: 36 }}
                    ></Image>
                    <Text
                      style={{ ...styles.buttonTextStyle, color: '#2196f3' }}
                    >
                      Click to scan again
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
          {scan && (
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={(node) => {
                this.scanner = node;
              }}
              onRead={this.onSuccess}
              bottomContent={
                <View>
                  <ImageBackground style={styles.bottomContent}>
                    <TouchableOpacity
                      style={styles.buttonScan2}
                      onPress={() => this.scanner.reactivate()}
                      onLongPress={() => this.setState({ scan: false })}
                    >
                      <Image
                        source={AppImages.sliitLogo}
                        style={{
                          marginTop: -450,
                          marginHorizontal: 20,
                          height: 70,
                          width: 55,
                        }}
                      ></Image>
                      <Image
                        source={AppImages.qr_camera_yellow}
                        style={{ marginTop: 320, marginHorizontal: -10 }}
                      ></Image>
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              }
            />
          )}
        </Fragment>
      </View>
    );
  }
}
export default Scan;
