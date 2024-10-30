import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert, FlatList } from 'react-native';

export default function App() {
  const [screen, setScreen] = useState('Welcome'); // Start on the Welcome screen
  const [meal, setMeal] = useState({ starter: '', main: '', dessert: '' });

  // Function to render the current screen
  const renderScreen = () => {
    switch (screen) {
      case 'Welcome':
        return <WelcomeScreen setScreen={setScreen} />;
      case 'Login':
        return <LoginScreen setScreen={setScreen} />;
      case 'Home':
        return <HomeScreen setScreen={setScreen} />;
      case 'Starters':
        return <StartersScreen setScreen={setScreen} setMeal={setMeal} meal={meal} />;
      case 'MainMenu':
        return <MainMenuScreen setScreen={setScreen} setMeal={setMeal} meal={meal} />;
      case 'Dessert':
        return <DessertScreen setScreen={setScreen} setMeal={setMeal} meal={meal} />;
      case 'Summary':
        return <SummaryScreen meal={meal} setScreen={setScreen} />;
      case 'Cart':
        return <CartScreen meal={meal} setScreen={setScreen} />;
      default:
        return <WelcomeScreen setScreen={setScreen} />;
    }
  };

  const handleLogout = () => {
    setMeal({ starter: '', main: '', dessert: '' });
    setScreen('Welcome'); // Return to Welcome screen on logout
  };

  return (
    <ImageBackground source={require('./assets/background1.jpg')} style={styles.background}>
      <View style={styles.container}>
        {renderScreen()}
        {screen !== 'Welcome' && screen !== 'Login' && screen !== 'Home' && (
          <View style={styles.navigation}>
            <Button title="Back" onPress={() => setScreen('Home')} />
            <Button title="Cart" onPress={() => setScreen('Cart')} />
            <Button title="Logout" onPress={handleLogout} />
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

// Welcome Screen
function WelcomeScreen({ setScreen }) {
  return (
    <ImageBackground source={require('./assets/background1.jpg')} style={styles.background}>
      <View style={styles.welcomeScreen}>
        <Text style={styles.welcomeText}>Welcome to your Food Restaurant</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => setScreen('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Login Screen
function LoginScreen({ setScreen }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      setScreen('Home'); // Navigate to Home screen
    } else {
      Alert.alert('Error', 'Please enter both username and password');
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} color="#4CAF50" />
    </View>
  );
}

// Home Screen with clickable images
function HomeScreen({ setScreen }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Select Your Course</Text>
      <View style={styles.imageRow}>
        <TouchableOpacity onPress={() => setScreen('Starters')}>
          <Image source={require('./assets/Starters.jpg')} style={styles.mealImage} />
          <Text style={styles.optionText}>Starter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('MainMenu')}>
          <Image source={require('./assets/main.jpg')} style={styles.mealImage} />
          <Text style={styles.optionText}>Main</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('Dessert')}>
          <Image source={require('./assets/Dessert.jpg')} style={styles.mealImage} />
          <Text style={styles.optionText}>Dessert</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Starters Screen
function StartersScreen({ setScreen, setMeal, meal }) {
  const starters = [
    { name: 'Soup', description: 'A warm soup' },
    { name: 'Salad', description: 'Fresh salad' },
    { name: 'Bruschetta', description: 'Tomato bruschetta' },
  ];

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Choose a Starter</Text>
      {starters.map((starter) => (
        <TouchableOpacity
          key={starter.name}
          style={styles.optionButton}
          onPress={() => {
            setMeal({ ...meal, starter: starter.name });
            setScreen('MainMenu');
          }}
        >
          <Text style={styles.optionText}>{starter.name} - {starter.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Main Menu Screen
function MainMenuScreen({ setScreen, setMeal, meal }) {
  const mains = [
    { name: 'Steak', description: 'Grilled steak' },
    { name: 'Chicken', description: 'Roasted chicken' },
    { name: 'Pasta', description: 'Italian pasta' },
  ];

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Choose a Main Course</Text>
      {mains.map((main) => (
        <TouchableOpacity
          key={main.name}
          style={styles.optionButton}
          onPress={() => {
            setMeal({ ...meal, main: main.name });
            setScreen('Dessert');
          }}
        >
          <Text style={styles.optionText}>{main.name} - {main.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Dessert Screen
function DessertScreen({ setScreen, setMeal, meal }) {
  const desserts = [
    { name: 'Ice Cream', description: 'Vanilla ice cream' },
    { name: 'Cake', description: 'Chocolate cake' },
    { name: 'Fruit Salad', description: 'Mixed fruits' },
  ];

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Choose a Dessert</Text>
      {desserts.map((dessert) => (
        <TouchableOpacity
          key={dessert.name}
          style={styles.optionButton}
          onPress={() => {
            setMeal({ ...meal, dessert: dessert.name });
            setScreen('Summary');
          }}
        >
          <Text style={styles.optionText}>{dessert.name} - {dessert.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Summary Screen
function SummaryScreen({ meal, setScreen }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your Selected Meal</Text>
      <Text style={styles.summaryText}>Starter: {meal.starter || 'Not selected'}</Text>
      <Text style={styles.summaryText}>Main: {meal.main || 'Not selected'}</Text>
      <Text style={styles.summaryText}>Dessert: {meal.dessert || 'Not selected'}</Text>
      <Button title="Confirm Order" onPress={() => setScreen('Cart')} color="#4CAF50" />
    </View>
  );
}

// Cart Screen
function CartScreen({ meal, setScreen }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your Cart</Text>
      <Text style={styles.summaryText}>Starter: {meal.starter || 'Not selected'}</Text>
      <Text style={styles.summaryText}>Main Course: {meal.main || 'Not selected'}</Text>
      <Text style={styles.summaryText}>Dessert: {meal.dessert || 'Not selected'}</Text>
      <Button title="Back to Menu" onPress={() => setScreen('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Light overlay for readability
  },
  welcomeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  optionText: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
  mealImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  summaryText: {
    fontSize: 20,
    marginVertical: 10,
    color: '#333',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f8f9fa',
    width: '100%',
  },
});

