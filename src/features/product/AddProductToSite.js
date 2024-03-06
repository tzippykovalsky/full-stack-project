import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Box, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Checkbox, Button, AlertTitle, Alert, Slide } from '@mui/material';
import { addProductToServer } from './productApi';
import { useSelector } from 'react-redux';
import CustomTextField from '../../components/CustomTextField';
import SaveAltIcon from '@mui/icons-material/SaveAlt';


let validationSchema = yup.object().shape({
  name: yup.string().min(3, 'שם המוצר חייב להכיל לפחות 3 תווים').required('שדה חובה'),
  price: yup.number().typeError('יכול להכיל רק ספרות').min(0, 'המחיר חייב להיות גדול מ-0').required('שדה חובה'),
  size: yup.string().min(0),
  company: yup.string().min(2, 'שם החברה חייב להכיל לפחות 2 תווים').required('שדה חובה'),
  quantityInStock: yup.number().typeError('יכול להכיל רק ספרות').required('שדה חובה'),
  color: yup.string(),
  category: yup.string(),
  imgUrl: yup.string(),
  imgUrl2: yup.string(),
  inSale: yup.boolean(),
  category: yup.string().required('שדה חובה'),
  description: yup.string().required('שדה חובה')
});



const AddProductToSite = () => {

  let currentUser = useSelector(state => state.user.currentUser);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {


        data.file = selectedFile;
      // alert(selectedFile.name)
      let res = await addProductToServer(data, currentUser.token)
      console.log(res);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
    catch (err) {
      console.log(errors);
      alert(err.response.data);
    }
  };



  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "12vh" }}>
        <Slide direction="left" in={showAlert} mountOnEnter unmountOnExit >
          <Alert severity="success" style={{ width: '50%', margin: '0 auto', textAlign: 'center' }}>
            <AlertTitle>  המוצר נוסף בהצלחה</AlertTitle>
          </Alert>
        </Slide>
        <div className="login-form">
          <h2 className='form-h2'>הוספת מוצר לאתר</h2>

          <CustomTextField label={'שם המוצר'} errors={errors} register={register} field={'name'} />
          <CustomTextField label={'מחיר'} errors={errors} register={register} field={'price'} />
          <CustomTextField label={'מידה/גודל'} errors={errors} register={register} field={'size'} />
          <CustomTextField label={'חברה'} errors={errors} register={register} field={'company'} />
          <CustomTextField label={'כמות במלאי'} errors={errors} register={register} field={'quantityInStock'} />
          <CustomTextField label={'צבע'} errors={errors} register={register} field={'color'} />
          <CustomTextField label={'תיאור המוצר'} errors={errors} register={register} field={'description'} />
          <CustomTextField label={'קטגוריה'} errors={errors} register={register} field={'category'} />


          {/* אגרטל מתכת דקורטיבי ואיכותי בעל מראה מודרני שישתלב עם מגוון סגנונות עיצוב ויוסיף נגיעה קטנה ומלאה בשיק. הפריט זמין בשני צבעים ובשני גדלים לבחירה לבחירה */}
          {/* כוס זכוכית שקופה בעלת הדפס פרחוני בצבע אדום עז בשילוב גימור זהב, אשר יחד מקנים לה מראה שובה לב ליצירת חווית אירוח משודרגת */}
          {/* סדרת צלחות זכוכית שקופות בעלות טקסטורה מרשימה עם גימור יחודי של זהב מבריק, לשדרוג ההגשה על שולחן האוכל בימי חול וחג */}
          {/* מגש שיש מלבני. בשל תכונות החומר ממנו עשוי, מגש זה יציב ועמיד במיוחד ומתאפיין בצבע מעניין קלאסי בתוספת עיטור שיש , בטקסטורה חלקה ובגימור מבריק למראה עשיר ואלגנטי. */}
          {/* מפת שולחן אלגנטית עשויה מתערובת איכותית של פוליאסטר ופשתן. הדוגמה הפרחונית בשילוב הצבעוניות הורסטילית יוצרים מראה הרמוני מלא בשיק אשר ישדרג בקלות כל סידור שולחן *מפה זו קיימת במגוון גדלים לבחירה. */}
          {/* סדרת נרות דיימונד . פריט זה עשוי שאווה זהובה בעלת מרקם חלק ועיטור אלמנטים חלקים בולטים. אלמנט זה מתאים כתוספת אלגנטית לסידור השולחן או לשדרוג פינות נוספות בבית. */}
          {/* שולחן מהאגדות  בסגנון פורטוגזי עם ניחוח עשיר של כלים ואביזרים משלימים שיקפיצו לכם את האירוח לסטנדרט שלא הכרתם */}


          {/* <FormControl variant="filled" sx={{ width: "25vw", marginBottom: "15px" }}>
            <InputLabel id="demo-simple-select-filled-label">קטגוריה</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
              sx={{
                backgroundColor: "white",
                border: "1px solid",
                color: "black",
                height: "5.5vh", // Set height to auto to adjust based on content
                "& .MuiSelect-root": {
                  height: "2rem", // Adjust the height of the Select component
                  lineHeight: "2rem", // Center the text vertically
                },
                "& .MuiInputBase-root": {
                  height: "2rem", // Adjust the height of the input field
                },
                "& p": {
                  color: "red",
                },
              }}
            >
              <MenuItem value="">
                <em>ללא</em>
              </MenuItem>
              <MenuItem value={10}>סלון ואוירה</MenuItem>
              <MenuItem value={20}>מטבח</MenuItem>
              <MenuItem value={30}>אקססוריז</MenuItem>
            </Select>
          </FormControl> */}

          <div>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="fileInput"
              onChange={handleFileChange}

            />
            <label htmlFor="fileInput">
              <Button sx={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid", marginBottom: "10px",
                '&:hover': {
                  backgroundColor: "white",
                  color: "black"
                }
              }}
                variant="contained"
                component="span"
                startIcon={<SaveAltIcon />}
              >
                הוספת תמונה
              </Button>
            </label>
          </div>

          <FormControlLabel control={<Checkbox />}    {...register('inSale')} label="במבצע" />
          {/* לא נכנס לשרת */}
          <button className='base-hover-button more-hover-button' type="submit" >הוספת מוצר</button>
        </div>
      </form>
    </>
  );
};

export default AddProductToSite;














