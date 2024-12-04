import React, { memo } from 'react';
import { FlatList, View } from 'react-native';
import RootContainer from '@/components/RootContainer';
import Clients from '@/components/Clients';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[
          { id: 'Clients', title: 'Clients', comp: Clients },
          { id: 'Factures', title: 'Factures' },
          { id: 'Bilan', title: 'Bilan' },
        ]}
        renderItem={(card) => (
          <View style={{ marginTop: 15, width: '100%', alignItems: 'center' }}>
            <RootContainer title={card.item.id}>
              {card.item.comp ? <card.item.comp /> : null}
            </RootContainer>
          </View>
        )}
        style={{ width: '100%', marginTop: 10 }}
      />
    </SafeAreaView>
  );
};

export default memo(Dashboard);
