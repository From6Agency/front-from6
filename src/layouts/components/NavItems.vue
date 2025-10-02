<script lang="ts" setup>
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      icon: 'ri-home-smile-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Chat Bot',
        to: '/chatbot',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Analytics',
        to: '/dashboard',
      }"
    />
  </VerticalNavGroup>

  <!-- 👉 Apps & Pages -->
  <!--
    <VerticalNavSectionTitle
    :item="{
    heading: 'Apps & Pages',
    }"
    />
  -->

  <!--
    <VerticalNavLink
    :item="{
    title: 'Account Settings',
    icon: 'ri-user-settings-line',
    to: '/account-settings',
    }"
    />

    <VerticalNavLink
    :item="{
    title: 'Login',
    icon: 'ri-login-box-line',
    to: '/login',
    }"
    />
    <VerticalNavLink
    :item="{
    title: 'Register',
    icon: 'ri-user-add-line',
    to: '/register',
    }"
    />
    <VerticalNavLink
    :item="{
    title: 'Error',
    icon: 'ri-information-line',
    to: '/no-existence',
    }"
    />

    <!-- 👉 User Interface
  -->
  <!--
    <VerticalNavSectionTitle
    :item="{
    heading: 'User Interface',
    }"
    />
    <VerticalNavLink
    :item="{
    title: 'Typography',
    icon: 'ri-text',
    to: '/typography',
    }"
    />
    <VerticalNavLink
    :item="{
    title: 'Icons',
    icon: 'ri-remixicon-line',
    to: '/icons',
    }"
    />
    <VerticalNavLink
    :item="{
    title: 'Cards',
    icon: 'ri-bar-chart-box-line',
    to: '/cards',
    }"
    />

    <!-- 👉 Forms & Tables
  -->
  <!--
    <VerticalNavSectionTitle
    :item="{
    heading: 'Forms & Tables',
    }"
    />
    <VerticalNavLink
    :item="{
    title: 'Form Layouts',
    icon: 'ri-layout-4-line',
    to: '/form-layouts',
    }"
    />
    <VerticalNavLink
    :item="{
    title: 'Tables',
    icon: 'ri-table-alt-line',
    to: '/tables',
    }"
    />
  -->

  <!-- 👉 Others -->
  <!--
    <VerticalNavSectionTitle
    :item="{
    heading: 'Others',
    }"
    />
    <VerticalNavLink
    :item="{
    title: 'Documentation',
    icon: 'ri-article-line',
    href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/documentation/',
    target: '_blank',
    }"
    />
    <VerticalNavLink
    :item="{
    title: 'Raise Support',
    href: 'https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free/issues',
    icon: 'ri-lifebuoy-line',
    target: '_blank',
    }"
    />
  -->
</template>
