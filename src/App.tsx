import { Routes, Route, Navigate } from 'react-router'
import { Layout } from '@/components/layout'
import { HomeLayout } from '@/components/home-layout'
import Home from '@/pages/home'
import MenuPage from '@/pages/menu'
import DisclosurePage from '@/pages/disclosure'
import DialogPage from '@/pages/dialog'
import PopoverPage from '@/pages/popover'
import TabsPage from '@/pages/tabs'
import TransitionPage from '@/pages/transition'
import ButtonPage from '@/pages/button'
import CheckboxPage from '@/pages/checkbox'
import ComboboxPage from '@/pages/combobox'
import FieldsetPage from '@/pages/fieldset'
import InputPage from '@/pages/input'
import ListboxPage from '@/pages/listbox'
import RadioGroupPage from '@/pages/radio-group'
import SelectPage from '@/pages/select'
import SwitchPage from '@/pages/switch'
import TextareaPage from '@/pages/textarea'
import SignupPage from '@/pages/signup'
import DataListPage from '@/pages/data-list'

export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="signup" element={<SignupPage />} />
        <Route path="react/data-list" element={<DataListPage />} />
        <Route path="react/menu" element={<MenuPage />} />
        <Route path="react/disclosure" element={<DisclosurePage />} />
        <Route path="react/dialog" element={<DialogPage />} />
        <Route path="react/popover" element={<PopoverPage />} />
        <Route path="react/tabs" element={<TabsPage />} />
        <Route path="react/transition" element={<TransitionPage />} />
        <Route path="react/button" element={<ButtonPage />} />
        <Route path="react/checkbox" element={<CheckboxPage />} />
        <Route path="react/combobox" element={<ComboboxPage />} />
        <Route path="react/fieldset" element={<FieldsetPage />} />
        <Route path="react/input" element={<InputPage />} />
        <Route path="react/listbox" element={<ListboxPage />} />
        <Route path="react/radio-group" element={<RadioGroupPage />} />
        <Route path="react/select" element={<SelectPage />} />
        <Route path="react/switch" element={<SwitchPage />} />
        <Route path="react/textarea" element={<TextareaPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
