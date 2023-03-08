import { StyleSheet ,Dimensions} from 'react-native';
import { RecipeCard } from '../../AppStyles';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  btn:{
    backgroundColor:"blue",
    padding:10,
    color:"white",
    borderRadius:4,
    marginBottom:10
  },
  homePhoto: {
    width: "100%",
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  homeName: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    margin:5,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: "90%",
    height: 250,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  },
});

export default styles;
