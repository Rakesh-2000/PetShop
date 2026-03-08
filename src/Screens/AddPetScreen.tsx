import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { validatePetForm, PetFormData, FormErrors } from '../Utils/validation';
import { useSubmitPet } from '../hooks/useApi';
import { Colors, Spacing, BorderRadius, FontSize } from '../Utils/theme';
import Toast from 'react-native-toast-message';

const INITIAL_FORM: PetFormData = { name: '', breed: '', age: '', price: '' };

const AddPetScreen = () => {
  const [form, setForm] = useState<PetFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const { submitPet, loading, error: apiError, success, reset } = useSubmitPet();

  const updateField = (field: keyof PetFormData) => (val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // ── Image picker ───────
  const options = { mediaType: 'photo' as MediaType, quality: 0.8 as const, includeBase64: false };

  const handleImagePick = useCallback((response: ImagePickerResponse) => {
    setImagePickerVisible(false);
    if (response.didCancel || response.errorCode) return;
    const uri = response.assets?.[0]?.uri;
    if (uri) setImageUri(uri);
  }, []);

  const openGallery = () => launchImageLibrary(options, handleImagePick);
  const openCamera = () => launchCamera(options, handleImagePick);

  // ── Submit ──────
  const handleSubmit = useCallback(async () => {
    const validation = validatePetForm(form);
    if (!validation.success) {
      setErrors(validation.errors);
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fix the fields highlighted in red',
      });
      return;
    }

    await submitPet({
      name: form.name.trim(),
      breed: form.breed.trim(),
      age: form.age,
      price: parseFloat(form.price),
      image: imageUri,
    });
  }, [form, imageUri, submitPet]);

  // Show toast on success/error
  React.useEffect(() => {
    if (success) {
      console.log("Success")
      setForm(INITIAL_FORM);
      setErrors({});
      setImageUri(null);
      reset();
    }
  }, [success]);

  React.useEffect(() => {
    if (apiError) {
      console.log("Fail")
    }
  }, [apiError]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add New Pet</Text>
          </View>

          {/* Image Picker */}
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={() => setImagePickerVisible(true)}
            activeOpacity={0.8}>
            {imageUri ? (
              <>
                <Image source={{ uri: imageUri }} style={styles.preview} />
                <View style={styles.changeOverlay}>
                  <Text style={styles.changeText}>Tap to change</Text>
                </View>
              </>
            ) : (
              <View style={styles.placeholderBox}>
                <Text style={styles.cameraIcon}>📷</Text>
                <Text style={styles.uploadText}>Upload Pet Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Pet Name *"
              placeholder="e.g. Max"
              value={form.name}
              onChangeText={updateField('name')}
              error={errors.name}
              autoCapitalize="words"
            />
            <Input
              label="Breed *"
              placeholder="e.g. Golden Retriever"
              value={form.breed}
              onChangeText={updateField('breed')}
              error={errors.breed}
              autoCapitalize="words"
            />
            <View style={styles.row}>
              <View style={styles.half}>
                <Input
                  label="Age*"
                  placeholder="e.g. 2"
                  value={form.age}
                  onChangeText={updateField('age')}
                  error={errors.age}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
              <View style={styles.half}>
                <Input
                  label="Price *" 
                  placeholder="e.g. 500"
                  value={form.price}
                  onChangeText={updateField('price')}
                  error={errors.price}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          </View>

          <Button
            title={loading ? 'Submitting…' : 'Add Pet to Shop'}
            onPress={handleSubmit}
            loading={loading}
            size="lg"
            style={styles.submitBtn}
          />

          <Button
            title="Clear Form"
            onPress={() => { setForm(INITIAL_FORM); setErrors({}); setImageUri(null); reset(); }}
            variant="outline"
            size="md"
            style={styles.clearBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Image Source Modal */}
      <Modal
        visible={imagePickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setImagePickerVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setImagePickerVisible(false)}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Choose Photo</Text>
            <TouchableOpacity style={styles.modalOption} onPress={openCamera}>
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={openGallery}>
              <Text style={styles.modalOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOption, styles.cancelOption]}
              onPress={() => setImagePickerVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  header: { marginBottom: Spacing.lg },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  // Image picker
  imagePicker: {
    height: 200,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  preview: { width: '100%', height: '100%' },
  changeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: Spacing.sm,
    alignItems: 'center',
  },
  changeText: { color: '#fff', fontWeight: '600', fontSize: FontSize.sm },
  placeholderBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cameraIcon: { fontSize: 40, marginBottom: Spacing.xs },
  uploadText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  uploadSub: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
    marginTop: 4,
  },

  // Form
  form: { marginBottom: Spacing.md },
  row: { flexDirection: 'row', gap: Spacing.sm },
  half: { flex: 1 },

  submitBtn: { marginBottom: Spacing.sm },
  clearBtn: {},

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalOptionIcon: { fontSize: 24, marginRight: Spacing.md },
  modalOptionText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  cancelOption: {
    borderBottomWidth: 0,
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  cancelText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.error,
    textAlign: 'center',
  },
});

export default AddPetScreen;
