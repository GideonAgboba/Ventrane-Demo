import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../../../components/Themed';
import {Colors} from '../../../constants';
import WalletSvg from '../../../assets/images/wallet.svg';
import TransferSvg from '../../../assets/images/transfer.svg';
import PaySvg from '../../../assets/images/pay.svg';
import TopUpSvg from '../../../assets/images/topup.svg';
import {scale} from 'react-native-size-matters';

export default function Service({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service</Text>
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
          <View style={[styles.cardIcon, {backgroundColor: Colors.danger}]}>
            <WalletSvg width={35} height={35} fill={Colors.white} size={35} />
          </View>
          <Text style={styles.cardText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
          <View style={[styles.cardIcon, {backgroundColor: Colors.info}]}>
            <TransferSvg width={35} height={35} fill={Colors.white} size={35} />
          </View>
          <Text style={styles.cardText}>Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
          <View style={[styles.cardIcon, {backgroundColor: Colors.warning}]}>
            <PaySvg width={35} height={35} fill={Colors.white} size={35} />
          </View>
          <Text style={styles.cardText}>Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
          <View style={[styles.cardIcon, {backgroundColor: Colors.success}]}>
            <TopUpSvg width={35} height={35} fill={Colors.white} size={35} />
          </View>
          <Text style={styles.cardText}>TopUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: scale(25),
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: scale(16),
    fontWeight: '700',
    marginBottom: scale(10),
    textTransform: 'capitalize',
  },
  card: {
    alignItems: 'center',
  },
  cardIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    borderRadius: scale(10),
    shadowColor: Colors.hash,
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 24,
  },
  cardText: {
    fontSize: scale(12),
    fontWeight: '500',
    marginTop: scale(8),
    textTransform: 'capitalize',
  },
});
