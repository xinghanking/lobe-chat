'use client';

import { Form } from '@lobehub/ui';
import { Divider } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { BRANDING_NAME } from '@/const/branding';
import { EMAIL_SUPPORT, mailTo } from '@/const/url';
import { useServerConfigStore } from '@/store/serverConfig';
import { serverConfigSelectors } from '@/store/serverConfig/selectors';

import AboutList from './features/AboutList';
import ItemLink from './features/ItemLink';
import Version from './features/Version';

const useStyles = createStyles(({ css, token }) => ({
  title: css`
    font-size: 14px;
    font-weight: bold;
    color: ${token.colorTextSecondary};
  `,
}));

const Page = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { t } = useTranslation('common');
  const { styles } = useStyles();
  useServerConfigStore(serverConfigSelectors.enabledTelemetryChat);
  return (
    <Form.Group style={{ width: '100%' }} title={`${t('about')} ${BRANDING_NAME}`} variant={'pure'}>
      <Flexbox gap={20} paddingBlock={20} width={'100%'}>
        <div className={styles.title}>{t('version')}</div>
        <Version mobile={mobile} />
        <Divider style={{ marginBlock: 0 }} />
        <div className={styles.title}>{t('contact')}</div>
        <AboutList
          ItemRender={ItemLink}
          items={[
            {
              href: '',
              label: 'WeChat:simon101201',
              value: '',
            },
            {
              href: mailTo(EMAIL_SUPPORT),
              label: 'Email:byte315@163.com',
              value: '',
            },
          ]}
        />
      </Flexbox>
    </Form.Group>
  );
});

Page.displayName = 'AboutSetting';

export default Page;
