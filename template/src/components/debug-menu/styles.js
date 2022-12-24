import {StyleSheet} from 'react-native'
import {colors} from '../../themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomColor: colors.placeholder,
    borderBottomWidth: 1,
  },
  closeButton: {
    marginRight: 6,
    paddingHorizontal: 8,
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  section: {
    marginTop: 24,
  },
  content: {
    marginVertical: 8,
  },
  infoMenu: {
    marginTop: 16,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    padding: 12,
  },
  flatListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: colors.placeholder,
    borderBottomWidth: 1,
  },
  flatListItemTitle: {
    flex: 1,
    marginRight: 8,
  },
  flatListItemIcon: {
    width: 24,
    height: 24,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderRadius: 12,
  },
  h3: {
    fontWeight: 'bold',
  },
})
