import React, { useEffect, useState } from 'react'
import { COLORS, normalize } from '~/config'
import { View } from 'react-native-animatable';

const DotICon = (props: { center?: boolean, }) => {
    const { center = true } = props
    const [status, setStatus] = useState(false);
    // useEffect(() => {
    //     getPermistion()
    // });
    // const getPermistion = async () => {
    //     let statu = await permissionLocation()
    //     setStatus(statu)
    // }
    return (
        <View
            direction='reverse'
            animation={'tada'}
            iterationCount={!!status ? 'infinite' : 1}
            style={[{
                width: normalize(18),
                height: normalize(18),
                borderRadius: normalize(9),
                backgroundColor: COLORS.blu1890ff,
                borderWidth: normalize(5),
                borderColor: COLORS.bgGray,
                marginHorizontal: normalize(5)
            }, center && { alignSelf: 'center' }]} />
    )
}

export default DotICon
