import { Text, View, TextInput, StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native"
import { useForm, Controller } from "react-hook-form"
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ThemeContext from '../components/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';

type UserDetails = {
  username: string;  
  email: string;
  password: string;
};

function SignUp() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDark = theme === "dark";
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  
  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passregex = /^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,}$/;
  
  function isValidEmail(email: string): boolean {
    return emailregex.test(email);
  }

  function isValidPassword(password: string): boolean {
    return passregex.test(password);
  }
  
  const onSubmit = (data: UserDetails) => {
    console.log(data);
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.darkSafeArea]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? "#0F0F0F" : "#FAFAFA"} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, isDark && styles.darkContainer]}>
          {/* Header with Back Button */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={24} color={isDark ? "#FFFFFF" : "#1A1A1A"} />
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconContainer, isDark && styles.darkIconContainer]}>
              <Text style={styles.iconText}>💪</Text>
            </View>
            <Text style={[styles.title, isDark && styles.darkText]}>{t('createAccount')}</Text>
            <Text style={[styles.subtitle, isDark && styles.darkSubText]}>{t('joinTransformation')}</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{
                  required: t('pleaseEnterEmail'),
                  validate: (value) => isValidEmail(value) || t('pleaseEnterValidEmail'),
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, isDark && styles.darkInput, errors.email && styles.inputError]}
                    placeholder={t('email')}
                    placeholderTextColor={isDark ? "#888" : "#999"}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
                name="email"
              />
              {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{
                  required: t('pleaseEnterUsername'),
                  minLength: {
                    value: 3,
                    message: t('usernameMinLength')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, isDark && styles.darkInput, errors.username && styles.inputError]}
                    placeholder={t('username')}
                    placeholderTextColor={isDark ? "#888" : "#999"}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                  />
                )}
                name="username"
              />
              {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                rules={{
                  required: t('pleaseEnterPassword'),
                  validate: (value) => isValidPassword(value) || t('passwordValidation'),
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, isDark && styles.darkInput, errors.password && styles.inputError]}
                    placeholder={t('password')}
                    placeholderTextColor={isDark ? "#888" : "#999"}
                    onChangeText={onChange}
                    secureTextEntry={true}
                    value={value}
                  />
                )}
                name="password"
              />
              {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </View>

            <TouchableOpacity style={[styles.signUpButton, isDark && styles.darkSignUpButton]} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.signUpButtonText}>{t('createAccount')}</Text>
            </TouchableOpacity>

            {/* Password Requirements */}
            <View style={[styles.passwordRequirements, isDark && styles.darkPasswordRequirements]}>
              <Text style={[styles.requirementsTitle, isDark && styles.darkText]}>{t('passwordRequirements')}</Text>
              <Text style={[styles.requirementText, isDark && styles.darkSubText]}>{t('atLeast8Characters')}</Text>
              <Text style={[styles.requirementText, isDark && styles.darkSubText]}>{t('oneUppercase')}</Text>
              <Text style={[styles.requirementText, isDark && styles.darkSubText]}>{t('oneSpecialCharacter')}</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, isDark && styles.darkSubText]}>{t('alreadyHaveAccount')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.loginText, isDark && styles.darkLoginText]}>{t('logIn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  darkSafeArea: {
    backgroundColor: "#0F0F0F",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  darkContainer: {
    backgroundColor: "#0F0F0F",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#8B5CF6",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  darkIconContainer: {
    backgroundColor: "#A855F7",
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
    textAlign: "center",
  },
  darkText: {
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  darkSubText: {
    color: "#AAAAAA",
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    color: "#1A1A1A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  darkInput: {
    backgroundColor: "#1A1A1A",
    borderColor: "#404040",
    color: "#FFFFFF",
  },
  inputError: {
    borderColor: "#FF6B6B",
    borderWidth: 2,
  },
  error: {
    color: "#FF6B6B",
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  signUpButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  darkSignUpButton: {
    backgroundColor: "#A855F7",
  },
  signUpButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  passwordRequirements: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  darkPasswordRequirements: {
    backgroundColor: "#1A1A1A",
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#666",
  },
  loginText: {
    fontSize: 16,
    color: "#8B5CF6",
    fontWeight: "600",
  },
  darkLoginText: {
    color: "#A855F7",
  },
});

export default SignUp;