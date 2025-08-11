import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';

export async function showAddToCartNotification(product: {
  title: string;
  thumbnail: string;
}) {
  try {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Added to Cart',
      body: product.title,
      android: {
        channelId: 'default',
        smallIcon: 'ic_launcher',
        largeIcon: product.thumbnail,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: product.thumbnail,
          title: product.title,
          summary: 'Added to your cart',
        },
      },
      ios: {
        attachments: [
          {
            url: product.thumbnail,
          },
        ],
      },
    });
  } catch (error) {
    console.warn('Failed to show notification', error);
  }
}
