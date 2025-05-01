import { Card, Cascader, ConfigProvider, DatePicker, DatePickerProps, Input, ThemeConfig } from "antd";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { CodeDataContext } from "../../contexts/CodeDataContext";
import { CloseCircleFilled } from '@ant-design/icons';
import dayjs from "dayjs";
import { runes } from 'runes2';

const theme:ThemeConfig = {
  components: {
    Card: {
      bodyPadding: 0,
    },
    // Input: {
    //   colorText: 'var(--color-text)',
    //   addonBg: 'var(--color-AC-2)',
    //   hoverBg: 'var(--color-AC-2)',
    //   activeBg: 'var(--color-AC-2)',
    //   colorBorder: 'var(--color-border)',
    //   hoverBorderColor: 'var(--color-border)',
    //   activeBorderColor: 'var(--color-border)',
    //   activeShadow: '0 0 0 0px',
    //   colorBgContainer: 'var(--color-AC-2)',
    //   controlHeightSM: 30,
    // },
    // Cascader: {
    //   colorText: 'var(--color-text)',
    //   colorBgLayout: 'var(--color-AC-2)',
    // },
    // DatePicker: {
    //   colorText: 'var(--color-text)',
    //   colorBgTextActive: 'var(--color-accent)',
    //   colorBgContainer: 'var(--color-AC-2)',
    //   colorBorder: 'var(--color-AC-2)',
    //   activeBorderColor: 'rgba(0,0,0,0)',
    //   activeShadow: '0 0 0 0px',
    //   hoverBorderColor: 'rgba(0,0,0,0)',
    //   colorSplit: 'var(--color-border)',
    //   controlHeight: 30,
    //   colorBgElevated: 'var(--color-AC-3)',
    //   colorPrimary: 'var(--color-accent)',
    //   colorTextPlaceholder: 'var(--color-text-disabled)',
    //   colorTextDisabled: 'var(--color-text-disabled)',
    //   colorTextLightSolid: 'var(--color-text-accent)',
    //   colorIcon: 'var(--color-text-disabled)',
    //   colorIconHover: 'var(--color-accent)',
    // }
  },
}

interface TagOption {
  value: string | number;
  label: string;
  children?: TagOption[];
}

const tagOptions: TagOption[] = [
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
  },
];


const CodeSettingBox: React.FC<{setFcName: Dispatch<SetStateAction<string>>}> = ( {setFcName} ) => {
  const settings = useContext(CodeDataContext).settings;
  const [title, setTitle] = useState(settings.title);
  const [date, setDate] = useState<dayjs.Dayjs | undefined>(settings.overtime === undefined ? undefined : dayjs(settings.overtime));

  const titleChangeTo = (t: string) => {
    settings.title;
    setTitle(t);
    setFcName(t);
  }

  const dateChangeTo = (date: dayjs.Dayjs) => {
    setDate(date)
    if (date === null) { settings.overtime = undefined; return; }
    settings.overtime = date.format('YYYY-MM-DD HH:mm:ss');
  }
  
  const dateBtn = (
    <div className="flex justify-between text-text">
      <button onClick={() =>dateChangeTo(dayjs().endOf('day'))} className="hover:text-accent">今天</button>
      <button onClick={() =>dateChangeTo(dayjs().add(15, 'minute'))} className="hover:text-accent">15分钟</button>
      <button onClick={() =>dateChangeTo(dayjs().add(1, 'hour'))} className="hover:text-accent">1小时</button>
      <button onClick={() =>dateChangeTo(dayjs().add(6, 'hour'))} className="hover:text-accent">6小时</button>
      <button onClick={() =>dateChangeTo(dayjs().add(1, 'day'))} className="hover:text-accent">1天</button>
      <button onClick={() =>dateChangeTo(dayjs().add(1, 'week'))} className="hover:text-accent">1周</button>
      <button onClick={() =>dateChangeTo(dayjs().add(1, 'month'))} className="hover:text-accent">1个月</button>
    </div>
  );
  
  const onDateChange: DatePickerProps['onChange'] = (date) => {
    dateChangeTo(date);
  };

  return (
    <ConfigProvider theme={theme}>
    <div className="flex-row space-y-4">
      {/* Input 区域 */}
      <div className="flex justify-between space-x-3">
        {/* 函数名称 */}
        <div className="flex w-full h-[30px] text-text rounded-[4px]">
          <div className="w-16 h-full bg-bgBase flex items-center justify-around !text-center">标题</div>
          <Input
          value={title}
          addonAfter={
            <button onClick={() => titleChangeTo('')}><CloseCircleFilled className="w-3"/></button>
          }
          count={{
            show: false,
            max: 40,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
          }}
          onChange={ (e) => {
            titleChangeTo(e.target.value)
          } }
          />
        </div>

        {/* 标签 */}
        <div className="flex w-full h-[30px] text-text rounded-[4px]">
          <div className="w-16 h-full bg-bgBase flex items-center justify-around !text-center">标签</div>
          <Cascader
          style={{ width: '100%' }}
          options={tagOptions}
          // onChange={onChange}
          multiple
          maxTagCount="responsive"
          showSearch={{}}
          // showCheckedStrategy={SHOW_CHILD}
          // defaultValue={[
          //   ['bamboo', 'little', 'fish'],
          //   ['bamboo', 'little', 'cards'],
          //   ['bamboo', 'little', 'bird'],
          // ]}
          />
        </div>
        {/* 过期时间 */}
        <div className="flex w-full h-[30px] text-text rounded-[4px]">
          <div className="w-28 h-full bg-bgBase flex items-center justify-around !text-center">过期时间</div>
          <DatePicker
          className="w-full"
          size="small"
          placeholder="不填，永久有效"
          showTime
          showNow={false}
          value={date}
          placement='bottomLeft'
          format={{
            format: 'YYYY-MM-DD HH:mm:ss',
            type: 'mask',
          }}
          renderExtraFooter={() => dateBtn}
          onChange={onDateChange}
          />
        </div>
      </div>

      {/* Markdown-it 区域 */}
      <Card className="h-96">

      </Card>
    </div>
    </ConfigProvider>
  )
}

export default CodeSettingBox;