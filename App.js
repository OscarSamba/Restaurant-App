import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
} from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('Welcome');
  const [menu, setMenu] = useState([
    { name: 'Margherita Pizza', price: 8.99, category: 'Main', image: require('./assets/Margherita.jpeg') },
    { name: 'Caesar Salad', price: 5.99, category: 'Starter', image: require('./assets/salad.jpg') },
    { name: 'Spaghetti Carbonara', price: 10.99, category: 'Main', image: require('./assets/pasta.jpeg') },
    { name: 'Chocolate Cake', price: 6.50, category: 'Dessert', image: require('./assets/Cake.jpeg') },
    { name: 'Mojito', price: 4.99, category: 'Drink', image: require('./assets/Mojito.jpg') },
    { name: 'Lemonade', price: 2.99, category: 'Drink', image: require('./assets/Lemonade.jpeg') },
    { name: 'Iced Tea', price: 3.99, category: 'Drink', image: require('./assets/Ice.jpeg') },
    { name: 'Cappuccino', price: 3.50, category: 'Drink', image: require('./assets/Cappuccino.jpg') },
    { name: 'Grilled Chicken', price: 12.99, category: 'Main', image: require('./assets/GrilledChicken.jpg') },
    { name: 'Prawn Cocktail', price: 7.99, category: 'Starter', image: require('./assets/PrawnCocktail.jpg') },
    { name: 'Tiramisu', price: 6.99, category: 'Dessert', image:
     require('./assets/tiramisu.jpg') },
    { name: 'Espresso', price: 2.50, category: 'Drink', image: require('./assets/Espresso.jpg') },
    { name: 'Fruit Salad', price: 4.50, category: 'Dessert', image:
     require('./assets/FruitSalad.jpeg') },
  ]);
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const renderScreen = () => {
    switch (screen) {
      case 'Welcome':
        return <WelcomeScreen setScreen={setScreen} />;
      case 'Login':
        return <LoginScreen setScreen={setScreen} setUsername={setUsername} setPassword={setPassword} />;
      case 'Home':
        return <HomeScreen setScreen={setScreen} menu={menu} addToCart={addToCart} />;
      case 'ChefMenu':
        return <ChefMenuScreen setScreen={setScreen} menu={menu} setMenu={setMenu} />;
      case 'FilterMenu':
        return <FilterMenuScreen setScreen={setScreen} menu={menu} />;
      case 'Cart':
        return <CartScreen cart={cart} setCart={setCart} setScreen={setScreen} />;
      case 'Checkout':
        return <CheckoutScreen cart={cart} setCart={setCart} setScreen={setScreen} />;
      case 'MenuDetails':
        return <MenuDetailsScreen menu={menu} setScreen={setScreen} />;
      default:
        return <WelcomeScreen setScreen={setScreen} />;
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
  };

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    setCart([]);
    setScreen('Welcome');
  };

  return (
    <ImageBackground source={require('./assets/Background..jpeg')} style={styles.background}>
      <View style={styles.container}>
        {renderScreen()}
        {screen !== 'Welcome' && screen !== 'Login' && (
          <View style={styles.navigation}>
            <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('Home')}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('FilterMenu')}>
              <Text style={styles.buttonText}>Filter Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('ChefMenu')}>
              <Text style={styles.buttonText}>Chef Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('Cart')}>
              <Text style={styles.buttonText}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('Checkout')}>
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('MenuDetails')}>
              <Text style={styles.buttonText}>Menu Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

// Welcome Screen
function WelcomeScreen({ setScreen }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.welcomeText}>Welcome to Your Food Restaurant</Text>
      <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// Login Screen with Background
function LoginScreen({ setScreen, setUsername, setPassword }) {
  return (
    <ImageBackground source={require('./assets/backgroud.jpg')} style={styles.background}>
      <View style={styles.screen}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('Home')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Home Screen with Background for Menu Items
function HomeScreen({ setScreen, menu, addToCart }) {
  return (
    <ImageBackground source={require('./assets/backgroud.jpg')} style={styles.background}>
      <View style={styles.screen}>
        <Text style={styles.title}>Menu</Text>
        <ScrollView>
          {menu.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => addToCart(item)} style={styles.menuItem}>
              <Image source={item.image} style={styles.menuImage} />
              <View>
                <Text style={styles.optionText}>{item.name}</Text>
                <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

// Menu Details Screen
function MenuDetailsScreen({ menu, setScreen }) {
  return (
    <ImageBackground source={require('./assets/backgroud.jpg')} style={styles.background}>
      <View style={styles.screen}>
        <Text style={styles.title}>Menu Details</Text>
        <ScrollView>
          {menu.map((item, index) => (
            <View key={index} style={styles.menuItem}>
              <Image source={item.image} style={styles.menuImage} />
              <Text style={styles.optionText}>{item.name} - ${item.price.toFixed(2)}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('Home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Chef Menu Screen
function ChefMenuScreen({ setScreen, menu, setMenu }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Chef's Menu Management</Text>
      <ScrollView>
        {menu.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <Text style={styles.optionText}>{item.name} - ${item.price.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => setMenu(menu.filter((_, i) => i !== index))}>
              <Text style={styles.deleteButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('Home')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// Filter Menu Screen
function FilterMenuScreen({ setScreen, menu }) {
  const categories = [...new Set(menu.map((item) => item.category))];

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Filter Menu by Category</Text>
      <ScrollView>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.filterButton}>
            <Text style={styles.optionText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('Home')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// Cart Screen
function CartScreen({ cart, setCart, setScreen }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your Cart</Text>
      <ScrollView>
        {cart.map((item, index) => (
          <View key={index} style={styles.menuItem}>
            <Text style={styles.optionText}>{item.name} - ${item.price.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.priceText}>Total: ${total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.roundedButton} onPress={() => setScreen('Checkout')}>
        <Text style={styles.buttonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

// Checkout Screen
function CheckoutScreen({ cart, setCart, setScreen }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.optionText}>Thank you for your purchase!</Text>
      <TouchableOpacity
        style={styles.roundedButton}
        onPress={() => {
          setCart([]);
          setScreen('Home');
        }}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  optionText: { fontSize: 18 },
  priceText: { fontSize: 16, color: 'gray' },
  input: { borderWidth: 1, padding: 10, margin: 5, width: '80%', borderRadius: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  menuImage: { width: 50, height: 50, marginRight: 10, borderRadius: 10 },
  navigation: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', margin: 10 },
  background: { flex: 1, resizeMode: 'cover' },
  welcomeText: { fontSize: 26, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 20 },
  roundedButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    margin: 5,
    width: '40%',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  filterButton: { padding: 10, margin: 5, backgroundColor: '#ddd', borderRadius: 10 },
  deleteButton: { color: 'red', marginLeft: 10 },
});
