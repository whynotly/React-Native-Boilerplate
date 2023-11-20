import { create } from 'zustand';

type StepIndex = 0 | 1 | 2;

export interface FormData {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export type FormDataKey = 'name' | 'email' | 'password' | 'role';
interface FormStoreState {
  activeStepIndex: StepIndex;
  formData: FormData;

  setActiveStepIndex: (index: StepIndex) => void;
  setFormData: (updater: (prevData: FormData) => FormData) => void;
}

const useFormStore = create<FormStoreState>((set) => ({
  activeStepIndex: 0,
  formData: {},

  setActiveStepIndex: (index) => set({ activeStepIndex: index }),
  setFormData: (updater) =>
    set((state) => ({ formData: updater(state.formData) })),
}));

export default useFormStore;
