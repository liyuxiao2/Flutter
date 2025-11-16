import { useState } from "react";
import { FormData, Tags } from "../types";

const initialFormData: FormData = {
  budget: 80,
  time: 3,
  aesthetic: "",
  location: "",
  allergies: "",
  inspiration: "",
};

const initialTags: Tags = {
  aesthetic: [],
  location: [],
  allergies: [],
  inspiration: [],
};

export const usePlanForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [tags, setTags] = useState<Tags>(initialTags);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const addTag = (section: keyof Tags, value: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const trimmedValue = value.trim();

    if (trimmedValue && !tags[section].includes(trimmedValue)) {
      setTags((prev) => ({
        ...prev,
        [section]: [...prev[section], trimmedValue],
      }));
      setFormData((prev) => ({ ...prev, [section]: "" }));
    }
  };

  const removeTag = (section: keyof Tags, tag: string) => {
    setTags((prev) => ({
      ...prev,
      [section]: prev[section].filter((t) => t !== tag),
    }));
  };

  const handleClearAll = () => {
    setFormData(initialFormData);
    setTags(initialTags);
  };

  return {
    formData,
    setFormData,
    tags,
    expandedSection,
    handleChange,
    toggleSection,
    addTag,
    removeTag,
    handleClearAll,
  };
};
